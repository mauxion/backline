import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

export function TopNav() {
  return (
    <Navbar fluid rounded className="bg-base-950 border-b border-gray-800">
      <NavbarBrand href="#">
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          backline.com.ua
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="#equipment" className="text-gray-200">Прайс</NavbarLink>
        <NavbarLink href="#contacts" className="text-gray-200">Контакти</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
