import { cn } from '@/lib/utils';
import Image from 'next/image';

export function MkSaaSLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/qzboatlogo.png"
      alt="Logo of qzboat"
      title="Logo of qzboat"
      width={96}
      height={96}
      className={cn('size-8 rounded-md', className)}
    />
  );
}
