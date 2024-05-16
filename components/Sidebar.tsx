import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { FaFire } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import { IoNewspaperOutline } from "react-icons/io5";
import Link from "next/link";

const menuItems = [
  { title: "Top Stories", api: "topstories", icon: <FaFire />, page: "/" },
  {
    title: "Best Stories",
    api: "beststories",
    icon: <FaRegNewspaper />,
    page: "/best-stories",
  },
  {
    title: "New Stories",
    api: "newstories",
    icon: <IoNewspaperOutline />,
    page: "/new-stories",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (route: string) => {
    router.push(route);
  };

  return (
    <div className="flex flex-col justify-center space-y-10 p-4 w-full h-full my-auto pl-auto bg-transparent mr-10">
      {menuItems.map((item, index) => (
        <Link href={item.page} key={index}>
          <div key={index} className="flex items-center space-y-1 justify-end p-1.5">
            {item.icon && <div className="mr-2">{item.icon}</div>}
            <div
              className={`cursor-pointer font-semibold text-sm bg-white w-fit ${
                pathname === item.page ? "text-red-500" : null
              }`}
              // onClick={() => handleClick(item.page)}
            >
              {item.title}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
