import Header from "../_components/layout/header";
import Sidebar from "../_components/layout/sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative grid min-h-screen min-w-full bg-muted/40 lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="hidden lg:block"></div>
      <div>
        <div className="fixed left-0 right-0 top-0 z-50 flex w-auto items-center justify-between lg:left-[280px]">
          <Header />
        </div>
        <main className="my-20 w-full p-6 sm:px-6 sm:py-0 lg:my-16 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
