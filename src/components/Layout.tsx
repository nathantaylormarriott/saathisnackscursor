import Navbar from "@/components/Navbar";
import Footer, { type FooterVariant } from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
  /** Hide site footer (e.g. admin) */
  hideFooter?: boolean;
  /** Sand background + dark copy (e.g. menu page) */
  footerVariant?: FooterVariant;
}

const Layout = ({ children, hideFooter, footerVariant = "default" }: LayoutProps) => {
  return (
    <>
      <Navbar />
      {/* Desktop: sticky “reveal” footer. Mobile: normal document flow (avoids sticky/jank). */}
      <main className="relative z-10 min-h-0 min-w-0 overflow-x-clip bg-background pt-[var(--nav-height)] md:min-h-screen">
        {children}
      </main>
      {!hideFooter ? (
        <div className="relative z-10 md:sticky md:bottom-0 md:left-0 md:right-0 md:z-0">
          <Footer variant={footerVariant} />
        </div>
      ) : null}
    </>
  );
};

export default Layout;
