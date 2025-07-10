import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import '@mantine/core/styles.css';
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  BackgroundImage,
  Center,
  createTheme,
  Group,
  MantineColorsTuple,
  MantineProvider,
} from '@mantine/core';
import GoHomeButton from '@/components/GoHomeButton';
import SignUpButton from '@/components/SignUpButton';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  display: 'swap',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const myGreen: MantineColorsTuple = [
    '#e9fcf0',
    '#daf3e2',
    '#b5e5c5',
    '#8ed6a6',
    '#6dca8b',
    '#58c27a',
    '#4bbf71',
    '#3dad62',
    '#309553',
    '#208144',
  ];
  const myYellow: MantineColorsTuple = [
    '#fff8e1',
    '#ffefcb',
    '#ffdd9a',
    '#ffca64',
    '#ffba38',
    '#ffb01b',
    '#ffa903',
    '#e39500',
    '#cb8400',
    '#b07100',
  ];

  const theme = createTheme({
    colors: {
      myGreen,
      myYellow,
    },
    autoContrast: true,
  });
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <MantineProvider theme={theme}>
          <BackgroundImage src=''>
            <Center>
              <AppShell header={{ height: 60 }} padding={'xs'} w={'75%'}>
                <AppShellHeader>
                  <Group
                    justify={'space-between'}
                    h={'100%'}
                    w={'100%'}
                    pr={'sm'}
                    bg={
                      theme.colors?.myGreen ? theme.colors.myGreen[1] : 'white'
                    }
                    miw={'345px'}
                  >
                    <GoHomeButton />
                    <SignUpButton />
                  </Group>
                </AppShellHeader>
                <AppShellMain>{children}</AppShellMain>
              </AppShell>
            </Center>
          </BackgroundImage>
        </MantineProvider>
      </body>
    </html>
  );
}
