import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, NavLink } from "react-router-dom";
import Header from "../../components/Header";
import {
  AiOutlineAlignRight,
  AiFillHome,
  AiFillEnvironment,
  AiFillCalculator,
  AiOutlineTable,
} from "react-icons/ai";
import ModalLogout from "../../components/modal/ModalLogout";
import { SiGooglemaps } from "react-icons/si";
import { LuWaves } from "react-icons/lu";
import { FaFish } from "react-icons/fa";
import { BiMatch } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";
import DataPoint from "./point/DataPoint";
import DataVariable from "./variable/DataVariable";
import DataResult from "./result/DataResult";
import Home from "./home/Home";
import DataCluster from "./cluster/DataCluster";
import Calculate from "./calculate/Calculate";

const MainAdmin = () => {
  let navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [openModalLogout, setOpenModalLogout] = useState(false);
  const menus = [
    {
      name: "Beranda",
      link: "/pages/home",
      icon: AiFillHome,
    },
    {
      name: "Titik Tangkapan",
      link: "/pages/point",
      icon: SiGooglemaps,
    },
    {
      name: "Data Variabel",
      link: "/pages/variable",
      icon: LuWaves,
    },
    {
      name: "Data Cluster",
      link: "/pages/cluster",
      icon: AiOutlineTable,
    },
    {
      name: "Perhitungan",
      link: "/pages/calculate",
      icon: AiFillCalculator,
    },
    // {
    //   name: "Hasil Tangkapan",
    //   link: "/pages/result",
    //   icon: FaFish,
    // },
  ];

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (!authToken) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Header />
      <div className="overflow-hidden">
        <div className="flex">
          <aside className="w-64 bg-primary text-white sticky-aside h-screen max-h-[800px] py-8 px-4 flex flex-col justify-between">
            <div className="relative flex flex-col gap-4 mt-4">
              {menus?.map((menu, i) => (
                <NavLink
                  to={menu?.link}
                  key={i}
                  className={` ${
                    menu?.margin && "mt-5"
                  } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-white  hover:text-primary hover:transparent rounded-md`}
                  activeClassName="text-[#FF0000]"
                >
                  <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                  <h2
                    className={`whitespace-pre ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu?.name}
                  </h2>
                </NavLink>
              ))}
            </div>
            <button
              onClick={() => setOpenModalLogout(true)}
              className="group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-white  hover:text-primary hover:transparent rounded-md"
            >
              <div>
                <TbLogout size="20" />
              </div>
              <h2
                className={`whitespace-pre ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                Keluar
              </h2>
            </button>
          </aside>
          <main className="flex-1 p-10">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/point" element={<DataPoint />} />
              <Route path="/variable" element={<DataVariable />} />
              <Route path="/result" element={<DataResult />} />
              <Route path="/cluster" element={<DataCluster />} />
              <Route path="/calculate" element={<Calculate />} />
            </Routes>
          </main>
        </div>
      </div>
      {openModalLogout && (
        <ModalLogout setOpenModalLogout={setOpenModalLogout} />
      )}
    </>
  );
};

export default MainAdmin;
