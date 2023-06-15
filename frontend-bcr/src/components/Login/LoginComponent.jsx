import React, { useEffect, useState } from "react";
import "../../styles/Login/LoginPage.css";
import kmbIconWhite from "../../assets/icons/kmbWhite.png";
import { useRef } from "react";
import simpleAlert, { confirmSimpleAlert } from "../../utils/manageAlerts";
// import { useDispatch } from "react-redux";
// import userIcon from "../../assets/icons/login/userColor.png";
import userIcon from "../../assets/icons/login/userColor3.png";
import loadingIcon from "../../assets/icons/login/loadingColor.png";
import lockIcon from "../../assets/icons/login/lockColor.png";
import { authenticUser } from "../../services/login";
import styles from "../../styles/Login/LoginPage.module.css";

const LoginComponent = () => {
  const [focus, setFocus] = useState({
    user: false,
    password: false,
  });
  const [checkRemember, setCheckRemember] = useState(false);
  const username = useRef(null);
  const password = useRef(null);
  const buttonLogin = useRef(null);
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    console.log(e);
    function resetLoginButton() {
      buttonLogin.current.value = "Ingresar";
      buttonLogin.current.disabled = false;
      buttonLogin.current.style.cssText =
        "color: #000000;background-color: rgb(103 232 249); border-color: transparent";
    }

    buttonLogin.current.disabled = true;
    buttonLogin.current.style.cssText =
      "color: rgb(103 232 249);background-color: transparent; border-color: rgb(103 232 249 )";
    buttonLogin.current.value = "Iniciando sesión...";
    if (username.current.value === "" || password.current.value === "") {
      simpleAlert("Error", "error", "Debe ingresar usuario y contraseña");
      resetLoginButton();
    } else {
      const dataUser = {
        username: username.current.value,
        password: password.current.value,
      };
      authenticUser(dataUser)
        .then((data) => {
          console.log(data);
          if (data && "auth" in data && data.auth && "token" in data) {
            const paramsAlert = {
              title: "Login",
              message: `Bienvenido ${username.current.value}`,
              typeOfAlert: "success",
              buttonConfirm: "Ok",
            };
            confirmSimpleAlert(paramsAlert, () => {
              sessionStorage.setItem("token", data.token);
              // sessionStorage.setItem("id", data.user.id);
              // sessionStorage.setItem("username", data.user.username);
              window.location.href = "/home";
            });
          } else {
            simpleAlert(
              "Usuario o contraseña incorrectos",
              "error",
              "Error de login"
            );
          }
        })
        .then(() => resetLoginButton());
    }
  }
  return (
    <section className="min-h-screen flex justify-center items-center bgWaves relative overflow-hidden">
      <section className="bg-[#1c2f3f] z-20 login-container-animation w-[350px] h-[450px] flex flex-col justify-center items-center  rounded-md">
        {/* <div className="ball-login-border"></div> */}
        {/* <img
          className="w-[100px] imageKMB drop-shadow-[2px_2px_3px_#000000]"
          src={kmbIconWhite}
          alt="kmb icon"
        /> */}
        <p className="text-2xl font-semibold text-slate-200">Login</p>
        <form
          onSubmit={(e) => handleLogin(e)}
          className="text-slate-50 w-[min(80%,450px)] py-2 pt-6 flex flex-col text-base"
        >
          <div className="mb-5 flex flex-row h-10 shadow-[2px_2px_4px_2px_#00000099] rounded-lg">
            <div className="rounded-l-lg flex justify-center items-center w-12 bg-slate-900/50 h-full">
              <img
                className={`${
                  focus.username ? "animate-bounce" : ""
                  // } w-8 h-8 filter invert-[0.5]`}
                } w-7 h-7 filter`}
                src={userIcon}
                alt="userIcon"
              />
            </div>
            <input
              onFocus={() => setFocus({ ...focus, username: true })}
              onBlur={() => setFocus({ ...focus, username: false })}
              ref={username}
              className="pl-2 w-full h-full  bg-transparent rounded-r-lg border-l-transparent outline-none placeholder-[rgba(255,255,255,0.61)] autofill:bg-transparent"
              // className="pl-2 w-full h-full  border-[1px] border-dashed border-cyan-400/30 bg-transparent rounded-r-lg border-l-transparent outline-none placeholder-[rgba(255,255,255,0.61)] autofill:bg-transparent"
              placeholder="Email or Username"
              type="text"
              required
            />
          </div>
          <div className="mb-10 flex flex-row h-10 shadow-[2px_2px_4px_2px_#00000099] rounded-lg">
            {/* <div className="pb-2 mb-10 flex flex-row h-12"> */}
            {/* <div className="pb-2 mb-10 border-b-[1px] border-[#aaaaaa44] flex flex-row gap-1 h-12"> */}
            {/* <div className="rounded-l-lg flex justify-center items-center w-10 bg-slate-400/30 h-full"> */}
            <div className="rounded-l-lg flex justify-center items-center w-12 bg-slate-900/50 h-full">
              <img
                className={`${focus.password ? "animate-bounce" : ""} w-7 h-7`}
                src={lockIcon}
                alt="userIcon"
              />
            </div>
            <input
              onFocus={() => setFocus({ ...focus, password: true })}
              onBlur={() => setFocus({ ...focus, password: false })}
              ref={password}
              className="pl-2 w-full h-full  bg-transparent rounded-r-lg border-l-transparent outline-none placeholder-[rgba(255,255,255,0.61)] autofill:bg-transparent"
              // className="pl-2 w-full h-full  border-[1px] border-dashed border-cyan-400/30 bg-transparent rounded-r-lg border-l-transparent outline-none placeholder-[rgba(255,255,255,0.61)] autofill:bg-transparent"
              placeholder="Password"
              type="password"
              required
            />
          </div>
          <div
            className="flex flex-row gap-1 mb-1 items-center"
            onClick={() => setCheckRemember((pre) => !pre)}
          >
            <div className="cursor-pointer flex justify-center items-center h-4 w-4 bg-transparent border-[1px] border-[#aaaaaa44] ">
              {checkRemember && (
                <label className="scale-[1.4] ml-1 mb-1 text-cyan-300">
                  &#10003;
                </label>
              )}
            </div>
            <label className="text-cyan-400/90 font-bold cursor-pointer">
              Remenber me
            </label>
          </div>
          <div className="mb-6 text-cyan-400/90 flex flex-row gap-1 items-center">
            <label className="text-2xl font-extrabold">&#8617;</label>
            <button className="border-[#67e8f99a] text-[#ffffffad] border-b-[1.6px] pb-[1px] hover:text-[#b9bbba99] text-sm">
              Forgot your password?
            </button>
          </div>
          <div className="text-[#646161] font-medium flex justify-center items-center">
            <input
              ref={buttonLogin}
              onClick={(e) => handleLogin(e)}
              className="bg-slate-900/50 shadow-[2px_2px_4px_2px_#00000099] font-semibold cursor-pointer rounded-full w-[min(250px,95%)] text-cyan-500 p-[.5rem_.5rem] border-2 border-transparent hover:border-cyan-300 hover:bg-transparent hover:text-cyan-300 hover:animate-pulse"
              type="submit"
              value={"Ingresar"}
            />
          </div>
        </form>
      </section>
      <div className={`absolute bottom-[-2px] left-0 h-[200px] w-full`}>
        <div
          className={`${styles.wave} ${styles.wave1} ${styles.animation_move_x}`}
        ></div>
        <div
          className={`${styles.wave} ${styles.wave2} ${styles.animation_move_x2}`}
        ></div>
      </div>
    </section>
  );
};

export default LoginComponent;
