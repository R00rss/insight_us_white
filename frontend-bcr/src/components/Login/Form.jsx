import React, { useState } from "react";
import userIcon from "../../assets/icons/login/userNoColor.png";
import lockIcon from "../../assets/icons/lockColor.png";
import loadingIcon from "../../assets/icons/loadingColor.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Form = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [focus, setFocus] = useState({
    user: false,
    password: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const getVerification = (e) => {
    e.preventDefault();
    setLoading(true);
    if (user === "" || password === "") {
      MySwal.fire({
        icon: "warning",
        title: "¡Alerta!",
        text: "¡Todos los campos son obligatorios!",
      });
      setLoading(false);
    } else {
      fetch("/api/verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user,
          password: password,
        }),
      })
        .then((resp) => {
          if (resp.status === 200) return resp.json();
          else if (resp.status === 408) {
            MySwal.fire({
              icon: "warning",
              title: "Error",
              text: "Usuario o contraseña incorrecta",
            });
          } else {
            console.log(resp.status);
            MySwal.fire({
              icon: "error",
              title: "Error",
              text: "¡Error en la respuesta del servidor!",
            });
          }
        })
        .then((data) => {
          if (data.verificacion === undefined) {
            MySwal.fire({
              icon: "error",
              title: "Error",
              text: "¡Error en la respuesta del servidor!",
            });
          } else {
            if (data.verificacion) {
              MySwal.fire({
                icon: "success",
                title: "¡Bienvenido " + user + "!",
                text: "¡Se ha logeado correctamente!",
              }).then(() => {
                sessionStorage.clear();
                sessionStorage.setItem("User", user);
                if ("status" in data) {
                  console.log("status", data.status);
                  if (data.status !== undefined) {
                    sessionStorage.setItem("Status", data.status);
                    if ("clientUser" in data) {
                      //console.log(data.clientUser)
                      sessionStorage.setItem("Client", data.clientUser);
                    } else {
                      console.log(" no data clientUser");
                    }
                  } else {
                    sessionStorage.setItem("Status", -1);
                  }
                }
                sessionStorage.setItem("Validate", "true");
                navigate("/reporte");
              });
            } else {
              MySwal.fire({
                icon: "error",
                title: "Error",
                text: "¡Usuario o Contraseña equivocados!",
              }).then(() => {
                setPassword("");
                sessionStorage.clear();
                sessionStorage.setItem("Validate", "false");
              });
            }
            setLoading(false);
          }
        })
        .then(() => setLoading(false))
        .catch((error) => {
          setLoading(false);
          console.error("Error al enviar los datos:", error);
        });
    }
  };

  return (
    <form
      // className="border-2 border-black/60 shadow-[4px_7px_10px_2px_#00000055] px-2 flex flex-col items-center w-[350px] h-[420px] md:h-[420px] bg-slate-200/10 rounded-lg z-10"
      className="shadow-[4px_7px_10px_2px_#00000055] px-2 flex flex-col items-center w-[350px] h-[420px] md:h-[420px] bg-slate-200 rounded-lg z-10"
    >
      <div className="flex justify-center items-center w-full p-[2.5rem_0]">
        <h2 className="text-4xl text-[#071a2bd2] font-bold drop-shadow-[2px_2px_1px_#00000066]">
          Login
        </h2>
      </div>
      <div className="w-full p-[0_0.5rem] flex flex-col items-center gap-4">
        <section className="flex flex-col w-[300px] gap-1">
          <div className="font-semibold text-slate-600">Usuario</div>
          <div className="ml-1 flex flex-row justify-center items-center rounded-lg shadow-[2px_2px_2px_1px_#00000044]">
            <div className="rounded-l-lg flex justify-center items-center w-10 bg-slate-400/30 h-full">
              <img
                className={`${
                  focus.user ? "animate-bounce" : ""
                } w-6 h-6 filter invert-[0.4] `}
                src={userIcon}
                alt="userIcon"
              />
            </div>
            <input
              onFocus={() => setFocus({ ...focus, user: true })}
              onBlur={() => setFocus({ ...focus, user: false })}
              className={`font-semibold text-slate-700 text-left rounded-r-lg bg-slate-200/80 w-full p-[0.25rem_0.5rem] border-[1px] border-transparent focus:outline-none`}
              // className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              type="email"
              placeholder="example@example.com"
              name="user"
              required
            />
          </div>
        </section>
        <section className="flex flex-col w-[300px] gap-1">
          <div className="font-semibold text-slate-600">Contraseña</div>
          <div className="ml-1 flex flex-row justify-center items-center rounded-lg shadow-[2px_2px_2px_1px_#00000044]">
            <div className="rounded-l-lg flex justify-center items-center w-10 bg-slate-400/30 h-full">
              <img
                className={`${
                  focus.password ? "animate-bounce" : ""
                } w-6 h-6 filter invert-[0.2]`}
                src={lockIcon}
                alt="userIcon"
              />
            </div>
            <input
              onFocus={() => setFocus({ ...focus, password: true })}
              onBlur={() => setFocus({ ...focus, password: false })}
              className="font-semibold text-slate-700 text-left rounded-r-lg bg-slate-200/80 w-full p-[0.25rem_0.5rem] border-[1px] border-transparent focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="***********"
              name="password"
              required
            />
          </div>
        </section>
        <section className="w-[300px]">
          <div className="hover:text-[#09abc8dd] duration-300 ease-in-out cursor-pointer font-semibold text-slate-600 w-full text-right text-sm">
            ¿Olvido su contraseña?
          </div>
        </section>
        <section className="w-[300px] h-10 focus:outline-none">
          <button
            onClick={(e) => getVerification(e)}
            className={` ${
              loading ? "hover-bg-login" : ""
            } flex flex-row justify-center items-center focus:outline-1 focus:outline-[#022f36] hover-bg-transparent border-[2px]  bg-button-login w-full h-full rounded-full text-slate-100 font-medium text-lg`}
          >
            {loading ? (
              <>
                <div>Cargando...</div>
                <div className="h-7 w-7 animate-spin filter hue-rotate-[290deg]">
                  <img
                    className="w-full h-full"
                    src={loadingIcon}
                    alt="loading icon"
                  />
                </div>
              </>
            ) : (
              <div>INGRESAR</div>
            )}
          </button>
        </section>
      </div>
    </form>
  );
};

export default Form;
