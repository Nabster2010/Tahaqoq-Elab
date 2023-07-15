import { siteConfig } from "@/config/site";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import UserDropDown from "./user-dropdown";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b print:hidden bg-background">
      <div className="container flex items-center space-x-4 h-14 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex items-center justify-end flex-1 space-x-4">
          <nav className="flex items-center space-x-2">
            <div>
              <UserDropDown />
            </div>

            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
