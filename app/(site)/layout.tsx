import { SiteHeader } from "@/components/site-header";
import { TailwindIndicator } from "@/components/tailwind-indicator";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative flex flex-col min-h-screen">
        <SiteHeader />
        <div className="container  flex-1 bg-[url('/grid.svg')] ">
          {children}
        </div>
      </div>
      <TailwindIndicator />
    </>
  );
};

export default AppLayout;
