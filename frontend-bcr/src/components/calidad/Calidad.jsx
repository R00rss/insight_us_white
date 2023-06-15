import React, { useEffect, useState } from "react";
import IngresoFantasma from "./ingreso/IngresoFantasma";
import NavbarCalidad from "./NavbarCalidad";
import Verificacion from "./verificacion/Verificacion";
import Dashboard from "./dashboard/Dashboard";
import { useSelector } from "react-redux";
const INITIAL_STATE_SELECTED_OPTION = {
  ingreso: false,
  verificacion: false,
  dashboard: false,
};
const Calidad = () => {
  const userData = useSelector((state) => state.userData.value);
  if (userData.tipo_usuario === "administrador") {
    INITIAL_STATE_SELECTED_OPTION.ingreso = true;
  }
  if (userData.tipo_usuario === "gestor") {
    INITIAL_STATE_SELECTED_OPTION.ingreso = true;
  }
  if (userData.tipo_usuario === "supervisor") {
    INITIAL_STATE_SELECTED_OPTION.verificacion = true;
  }
  if (userData.tipo_usuario === "cliente") {
    INITIAL_STATE_SELECTED_OPTION.dashboard = true;
  }

  const [selectedOption, setSelectedOption] = useState({
    ingreso: false,
    verificacion: false,
    dashboard: true,
  });
  function handleChangeOption(option) {
    const temp = { ...selectedOption };
    Object.keys(temp).forEach((key) => (temp[key] = key === option));
    setSelectedOption(temp);
  }
  // useEffect(() => console.log(selectedOption), [selectedOption]);
  return (
    <section className="h-full w-full flex flex-col gap-2">
      <NavbarCalidad callback={handleChangeOption} options={selectedOption} />
      {selectedOption.ingreso && <IngresoFantasma />}
      {selectedOption.verificacion && <Verificacion />}
      {selectedOption.dashboard && <Dashboard />}
    </section>
  );
};

export default Calidad;
