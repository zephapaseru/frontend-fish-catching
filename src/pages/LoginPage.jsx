import React, { useState } from "react";
import { app } from "../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ToastError from "../components/toast/ToastError";
import ToastSuccess from "../components/toast/ToastSuccess";
import Logo from "../assets/ic_logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const auth = getAuth(app);
  let navigate = useNavigate();
  const handlerLoginSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/pages/home");
        sessionStorage.setItem(
          "Auth Token",
          userCredential._tokenResponse.refreshToken
        );
        setIsSuccess(true);
        setMessage("Berhasil Masuk");
        setTimeout(() => {
          setIsSuccess(false);
        }, 2500);
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          setMessage("Kata Sandi Salah");
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 2500);
        }

        if (error.code === "auth/user-not-found") {
          setMessage("Pengguna Tidak Ditemukan");
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 2500);
        }

        if (error.code === "auth/invalid-emai") {
          setMessage("Email Tidak Ditemukan");
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 2500);
        }
      });
  };
  return (
    <>
      {isSuccess && <ToastSuccess message={message} />}
      {isError && <ToastError message={message} />}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-[600px] rounded-xl">
          <div className="w-90%">
            <div className="flex flex-col items-center justify-center space-y-5">
              <img src={Logo} alt="Logo" />
              <h3 className="text-2xl font-bold text-center text-first">
                Masuk
              </h3>
              <p className="text-[20px]">Masukan Email dan Kata Sandi</p>
            </div>
            <form className="w-full mt-4">
              <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col w-full max-w-xs space-y-2">
                  <label htmlFor="email" className="font-semibold">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder="zpaseru@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full max-w-xs input input-bordered"
                  />
                </div>
                <div className="flex flex-col w-full max-w-xs mt-4 space-y-3">
                  <label htmlFor="password" className="font-semibold">
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="******"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full max-w-xs input input-bordered"
                  />
                </div>
                <div className="w-full max-w-xs mt-6">
                  <button
                    onClick={handlerLoginSubmit}
                    className="w-full max-w-xs btn btn-primary"
                  >
                    Masuk
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
