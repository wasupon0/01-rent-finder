import logo from "@/assets/images/logo-icon.svg";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    /* <!-- Footer --> */
    <footer className="py-4 mt-24 bg-gray-200">
      <div className="container flex flex-col items-center justify-between px-4 mx-auto md:flex-row">
        <div className="mb-4 md:mb-0">
          <Image src={logo} alt="Logo" className="w-auto h-10" />
        </div>
        <div>
          <p className="mt-2 text-sm text-gray-500 md:mt-0">
            &copy; {currentYear} RentFinder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
