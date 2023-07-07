import { SiteHeader } from "@/components/site-header";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import TanstackProvider from "@/components/TanstackProvider";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TanstackProvider>
        <div className="relative flex flex-col min-h-screen">
          <SiteHeader />
          <div className="container flex-1 bg-[url('/grid.svg')] ">
            {children}
          </div>
        </div>
        <TailwindIndicator />
      </TanstackProvider>
    </>
  );
};

export default AppLayout;
