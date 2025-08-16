import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => (
    <span className={cn('text-xl font-bold text-black dark:text-white', className)}>Notely</span>
);
