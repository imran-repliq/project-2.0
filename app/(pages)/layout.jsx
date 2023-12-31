import Providers from "@/components/Providers/Providers";
import PageHeader from "../../components/shared/ui/sidebar/PageHeader";
import PageSidebar from "../../components/shared/ui/sidebar/PageSidebar";

const sidebarRoute = [
  {
    title: "Purchase",
    route: "/purchase",
  },
  {
    title: "Purchase Group List",
    route: "/purchase-group-list",
  },
  {
    title: "Procure Info Report",
    route: "/procure-info-report",
  },
  {
    title: "Purchase Info Report",
    route: "/purchase-info-report",
  },
  {
    title: "Return",
    route: "/return",
  },
  {
    title: "Settings",
    route: "/settings",
  },
];

export default function PagesLayout({ children }) {
  // const pathname = usePathname();
  // const path = pathNameFInder(pathname, sidebarRoute);

  return (
    <Providers>
      <div className="min-h-screen">
        <div className="flex w-full min-h-screen">
          <PageSidebar sidebarRoute={sidebarRoute} />
          <div className="w-full ml-[280px] overflow-y-auto">
            <PageHeader sidebarRoute={sidebarRoute} />
            <div className="p-6">{children}</div>
          </div>
        </div>
      </div>
    </Providers>
  );
}
