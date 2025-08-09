'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { signUpUser } from '@/server/users';
import Link from 'next/link';

const formSchema = z.object({
    name: z.string()
        .min(2, { error: 'Username should be at least 2 characters long' })
        .max(64, { error: 'Username cannot be more than 64 characters long' }),
    email: z.email(),
    password: z.string().min(8, { error: 'Password should be at least 8 characters long' }),
});


export const SignupForm = ({
                               className,
                               ...props
                           }: React.ComponentProps<'div'>) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const result = await signUpUser(values.name, values.email, values.password);
            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error((error as Error)?.message || 'Failed to sign up');
        }
    };

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Create your account</CardTitle>
                    <CardDescription>
                        Enter your details below to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Your name"
                                    required
                                    {...form.register('name')}
                                />
                                {form.formState.errors.name && (
                                    <span className="text-sm text-red-500">{form.formState.errors.name.message as string}</span>
                                )}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    {...form.register('email')}
                                />
                                {form.formState.errors.email && (
                                    <span className="text-sm text-red-500">{form.formState.errors.email.message as string}</span>
                                )}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" required {...form.register('password')} />
                                {form.formState.errors.password && (
                                    <span className="text-sm text-red-500">{form.formState.errors.password.message as string}</span>
                                )}
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? 'Signing up...' : 'Sign up'}
                                </Button>
                                <Button variant="outline" className="w-full" type="button">
                                    Sign up with Google
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{' '}
                            <Link href="/signin" className="underline underline-offset-4">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
