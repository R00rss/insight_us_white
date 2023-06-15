import React from "react";
import { useSelector } from "react-redux";
const NavbarCalidad = ({ callback, options }) => {
  const userData = useSelector((state) => state.userData.value);
  console.log(userData);
  function GenerateNavbar(tipo) {
    if (tipo === "administrador") {
      return (
        <>
          <li
            onClick={() => callback("ingreso")}
            className={`${
              options.ingreso
                ? "shadow-[inset_1px_1px_8px_1px_#00000022,1px_1px_1px_1px_#00000055]"
                : ""
            } px-[1px] hover:bg-slate-100/20 w-[130px] text-center cursor-pointer rounded-md `}
          >
            Ingreso
          </li>
          <li
            onClick={() => callback("verificacion")}
            className={`${
              options.verificacion
                ? "shadow-[inset_1px_1px_8px_1px_#00000022,1px_1px_1px_1px_#00000055]"
                : ""
            } px-[1px] hover:bg-slate-100/20 w-[130px] text-center cursor-pointer rounded-md `}
          >
            Verificación
          </li>
          <li
            onClick={() => callback("dashboard")}
            className={`${
              options.dashboard
                ? "shadow-[inset_1px_1px_8px_1px_#00000022,1px_1px_1px_1px_#00000055]"
                : ""
            } px-[1px] hover:bg-slate-100/20 w-[130px] text-center cursor-pointer rounded-md `}
          >
            Dashboard
          </li>
        </>
      );
    } else if (tipo === "gestor") {
      return (
        <>
          <li
            onClick={() => callback("ingreso")}
            className={`${
              options.ingreso
                ? "shadow-[inset_1px_1px_8px_1px_#00000022,1px_1px_1px_1px_#00000055]"
                : ""
            } px-[1px] hover:bg-slate-100/20 w-[130px] text-center cursor-pointer rounded-md `}
          >
            Ingreso
          </li>
        </>
      );
    } else if (tipo === "supervisor") {
      return (
        <>
          <li
            onClick={() => callback("verificacion")}
            className={`${
              options.verificacion
                ? "shadow-[inset_1px_1px_8px_1px_#00000022,1px_1px_1px_1px_#00000055]"
                : ""
            } px-[1px] hover:bg-slate-100/20 w-[130px] text-center cursor-pointer rounded-md `}
          >
            Verificación
          </li>
          <li
            onClick={() => callback("dashboard")}
            className={`${
              options.dashboard
                ? "shadow-[inset_1px_1px_8px_1px_#00000022,1px_1px_1px_1px_#00000055]"
                : ""
            } px-[1px] hover:bg-slate-100/20 w-[130px] text-center cursor-pointer rounded-md `}
          >
            Dashboard
          </li>
        </>
      );
    } else if (tipo === "cliente") {
      return (
        <>
          {/* <li
            onClick={() => callback("dashboard")}
            className={`${
              options.dashboard
                ? "shadow-[inset_1px_1px_8px_1px_#00000022,1px_1px_1px_1px_#00000055]"
                : ""
            } px-[1px] hover:bg-slate-100/20 w-[130px] text-center cursor-pointer rounded-md `}
          >
            Dashboard
          </li> */}
        </>
      );
    }
  }
  return (
    // <section className="bg-gradient-to-br from-cyan-200 via-sky-700 to-cyan-400 rounded-[0px_200px_0px_200px] px-2">
    <nav className="w-full navbarColor2 rounded-[0px_200px_0px_200px] text-sm shadow-[3px_3px_4px_0px_#000000aa]">
      <ul className="w-full flex flex-row gap-3 justify-center text-slate-200/90 font-medium">
        {/* {userData.tipo_usuario} */}
        {GenerateNavbar(userData.tipo_usuario)}
      </ul>
    </nav>
  );
};

export default NavbarCalidad;
