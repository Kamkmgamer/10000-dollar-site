import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { MainContent } from '@/components/layout/MainContent';

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navigation />
            <MainContent>{children}</MainContent>
            <Footer />
        </>
    );
}
