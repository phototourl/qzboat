import { Analytics } from '@/analytics/analytics';
import {
  fontBricolageGrotesque,
  fontNotoSans,
  fontNotoSansMono,
  fontNotoSerif,
} from '@/assets/fonts';
import AffonsoScript from '@/components/affiliate/affonso';
import PromotekitScript from '@/components/affiliate/promotekit';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { type Locale, NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { Providers } from './providers';

import '@/styles/globals.css';

export const metadata: Metadata = {
  other: {
    'baidu-site-verification': 'codeva-EK0eG9SVYL',
  },
};

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}

/**
 * 1. Locale Layout
 * https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing#layout
 *
 * 2. NextIntlClientProvider
 * https://next-intl.dev/docs/usage/configuration#nextintlclientprovider
 */
export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html suppressHydrationWarning lang={locale}>
      <head>
        <AffonsoScript />
        <PromotekitScript />
        {/* Google AdSense */}
        <meta
          name="google-adsense-account"
          content="ca-pub-4341915232925745"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4341915232925745"
          crossOrigin="anonymous"
        />
        {/* Profitable CPM Network Ads */}
        <script src="https://pl29089413.profitablecpmratenetwork.com/4b/f7/c8/4bf7c8b9ddd34f788eddf5e81c886f8f.js" async />
        <script
          async
          data-cfasync="false"
          src="https://pl29089414.profitablecpmratenetwork.com/91ffdb80d3c682a176ab95428b88e907/invoke.js"
        />
        <div id="container-91ffdb80d3c682a176ab95428b88e907" />
        <script src="https://pl29089416.profitablecpmratenetwork.com/40/8a/72/408a725a198373f42ba890abf894b874.js" async />
        <script
          dangerouslySetInnerHTML={{
            __html: `atOptions = {
              'key' : '93cd993fc41588cfd59acdad55ce95d7',
              'format' : 'iframe',
              'height' : 300,
              'width' : 160,
              'params' : {}
            };`,
          }}
        />
        <script
          async
          src="https://www.highperformanceformat.com/93cd993fc41588cfd59acdad55ce95d7/invoke.js"
        />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          'size-full antialiased',
          fontNotoSans.className,
          fontNotoSerif.variable,
          fontNotoSansMono.variable,
          fontBricolageGrotesque.variable
        )}
      >
        <NuqsAdapter>
          <NextIntlClientProvider>
            <Providers locale={locale}>
              {children}

              <Toaster richColors position="top-right" offset={64} />
              <Analytics />
            </Providers>
          </NextIntlClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
