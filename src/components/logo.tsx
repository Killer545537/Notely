import { cn } from '@/lib/utils'

export const Logo = ({ className }: { className?: string }) => {
    return (
        <span className={cn('font-bold text-xl text-black dark:text-white', className)}>
            Notely
        </span>
    );
}