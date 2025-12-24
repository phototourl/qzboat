import { Logo } from '@/components/layout/logo';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function BuiltWithButton() {
  return (
    <Link
      target="_blank"
      href="https://www.qzboat.com?utm_source=built-with-qzboat"
      className={cn(
        buttonVariants({ variant: 'outline', size: 'sm' }),
        'border border-border px-4 rounded-md'
      )}
    >
      <span>Built with</span>
      <span>
        <Logo className="size-5" />
      </span>
      <span className="font-semibold">QzBoat</span>
    </Link>
  );
}
