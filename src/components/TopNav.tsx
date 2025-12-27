import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

export function TopNav() {
  return (
    <Navbar fluid rounded className="w-full border-b border-gray-800 dark:bg-gray-950/60 backdrop-blur-sm shadow">
      <div className="max-w-6xl w-full mx-auto px-4 py-1 flex items-center justify-between">
        <NavbarBrand href="#">
          <img src="/Logo_small.png" className="mr-3 h-6 sm:h-9" alt="" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Backline.com.ua</span>

        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          <NavbarLink href="#packages" className="text-gray-200">Пакети</NavbarLink>
          <NavbarLink href="#equipment" className="text-gray-200">Прайс</NavbarLink>
          <NavbarLink href="#contacts" className="text-gray-200">Контакти</NavbarLink>
        </NavbarCollapse>
      </div>
    </Navbar>
  );
}
