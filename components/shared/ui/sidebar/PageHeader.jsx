"use client";

import { pathNameFInder } from "@/common/helpers/utlits";
import { usePathname } from "next/navigation";

export default function PageHeader({ sidebarRoute }) {
  const pathname = usePathname();
  const path = pathNameFInder(pathname, sidebarRoute);

  return (
    <div className="bg-gray-200 px-6 py-4 w-full flex justify-between">
      <div>
        <h3 className="text-2xl font-medium">{path.title}</h3>
      </div>

      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open</Button>
          <div className="border-2 hover:border-gray-400 p-1 rounded-full">
            <Image
              className="rounded-full"
              src={Avatar}
              width={40}
              height={40}
              alt="Picture of the author"
            />
          </div> 
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </div>
  );
}
