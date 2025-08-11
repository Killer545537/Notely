'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

const formSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ResetPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenParam = searchParams?.get('token');
    if (!tokenParam) {
      toast.error('Missing reset token');
      router.push('/forgot-password');
    } else {
      setToken(tokenParam);
    }
  }, [searchParams, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!token) {
      toast.error('Missing reset token');
      return;
    }

    try {
      setIsSubmitting(true);
      const {error} = await authClient.resetPassword({
          newPassword: values.password,
          token: token ?? '',
      });

      if (!error) {
      toast.success('Password reset successfully');
      router.push('/signin');
      } else {
          toast.error(error.message);
      }
    } catch (error) {
      toast.error((error as Error)?.message || 'Failed to reset password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create a new password</CardTitle>
          <CardDescription>
            Please create a new secure password for your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  {...form.register('password')}
                />
                {form.formState.errors.password && (
                  <span className="text-sm text-red-500">
                    {form.formState.errors.password.message}
                  </span>
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  {...form.register('confirmPassword')}
                />
                {form.formState.errors.confirmPassword && (
                  <span className="text-sm text-red-500">
                    {form.formState.errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}