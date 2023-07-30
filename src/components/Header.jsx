import React from "react";
import Logo from "../assets/ic_logo.png";

const Header = () => {
  return (
    <>
      <header className="z-10 w-full p-4 text-white sticky-header bg-primary">
        <div className="flex items-center space-x-3">
          <img src={Logo} alt="Logo" className="w-14 h-14" />
          <div>
            <h1 className="text-sm font-bold">SISTEM INFORMASI GEOGRAFIS</h1>
            <p className="text-xs">Pemetaan Daerah Penangkapan Ikan Laut</p>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
