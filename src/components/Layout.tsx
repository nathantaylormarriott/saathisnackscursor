import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
  /** Hide site footer (e.g. admin) */
  hideFooter?: boolean;
}

const Layout = ({ children, hideFooter }: LayoutProps) => {
  return (
    <>
      <Navbar />
      {/* Main paints above the footer; scrolling reveals the sticky footer (same pattern as Big Green Tent) */}
      <main className="relative z-10 min-h-screen bg-background pt-[var(--nav-height)]">{children}</main>
      {!hideFooter ? (
        <div className="sticky bottom-0 left-0 right-0 z-0">
          <Footer />
        </div>
      ) : null}
    </>
  );
};

export default Layout;
