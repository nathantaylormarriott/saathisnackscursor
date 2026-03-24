import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      {/* Main paints above the footer; scrolling reveals the sticky footer (same pattern as Big Green Tent) */}
      <main className="relative z-10 min-h-screen bg-background pt-16">{children}</main>
      <div className="sticky bottom-0 left-0 right-0 z-0">
        <Footer />
      </div>
    </>
  );
};

export default Layout;
