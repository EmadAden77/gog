import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Bedroom SelfieCraft - Smartphone Bedroom Selfie Prompt Engine',
  description: 'A hyper-focused, physically grounded smartphone selfie prompt engine strictly calibrated for realistic bedroom environments, authentic arm biomechanics, mirror reflections, and indoor lighting for ChatGPT Images & Gemini.',
  openGraph: {
    title: 'Bedroom SelfieCraft - Smartphone Bedroom Selfie Prompt Engine',
    description: 'A hyper-focused, physically grounded smartphone selfie prompt engine strictly calibrated for realistic bedroom environments, authentic arm biomechanics, mirror reflections, and indoor lighting for ChatGPT Images & Gemini.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bedroom SelfieCraft - Smartphone Bedroom Selfie Prompt Engine',
    description: 'A hyper-focused, physically grounded smartphone selfie prompt engine strictly calibrated for realistic bedroom environments, authentic arm biomechanics, mirror reflections, and indoor lighting for ChatGPT Images & Gemini.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ar" dir="rtl">
      <body suppressHydrationWarning className="font-sans antialiased">{children}</body>
    </html>
  );
}
