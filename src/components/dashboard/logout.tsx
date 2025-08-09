"use client"

import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';

export const Logout = () => {
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut();
        router.push('/');
    };

    return (
        <Button variant="outline" onClick={handleLogout}>
            Logout
        </Button>
    );
};