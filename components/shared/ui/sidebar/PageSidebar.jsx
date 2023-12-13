"use client";

import Image from "next/image";
import Link from "next/link";
import HealthOsLogo from "../../../../public/assets/images/logo-text.png";

export default function PageSidebar({ sidebarRoute }) {
  return (
    <div className="flex justify-center bg-white border-r w-[280px] fixed min-h-screen">
      <div>
        <Image
          className="pt-6 pb-4"
          src={HealthOsLogo}
          alt="Picture of the author"
          width={200}
          height={200}
        />
        {sidebarRoute.map((item, index) => (
          <Link
            key={index}
            className="px-8 py-4 block hover:bg-gray-200 rounded-md"
            href={item.route}
          >
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
