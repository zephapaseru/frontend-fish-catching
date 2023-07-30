import React from "react";
import IconLogout from "../../assets/ic_logout.png";
import { useNavigate } from "react-router-dom";

const ModalLogout = ({ setOpenModalLogout }) => {
  let navigate = useNavigate();

  const Logout = () => {
    sessionStorage.removeItem("Auth Token");
    navigate("/login");
  };
  return (
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      id="modal-overlay"
    >
      <div class="bg-white p-8 rounded-md shadow-lg ">
        <h2 class="text-xl font-semibold mb-4 text-center">
          Apakah Anda Yakin Ingin Keluar ?
        </h2>
        <img src={IconLogout} alt="" className="w-40 h-40 mx-auto" />
        <div className="grid grid-cols-2 mt-4">
          <button
            onClick={() => Logout()}
            className="w-32 btn btn-primary btn-sm"
          >
            Ya
          </button>
          <button
            onClick={() => setOpenModalLogout(false)}
            className="w-36 btn btn-error btn-sm"
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalLogout;
