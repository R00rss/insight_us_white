import React from "react";
import Form from "../components/Login/Form";
import styles from "../styles/Login/LoginPage.module.css";
import logo_kmb from "../assets/icons/login/kmb_white_legend.png";
import { useEffect } from "react";
import { changeTitle } from "../../functions/general";
const LoginPage = () => {
  useEffect(() => {
    changeTitle("KMB | Login");
  }, []);

  return (
    <main
      // className="overflow-hidden relative w-full gap-5 bg-slate-400 flex flex-col md:flex-row justify-center items-center bg-[linear-gradient(#00d9ff90,#34f79955,#00f7ff55)] h-screen"
      className="overflow-hidden relative w-full gap-4 md:gap-24 lg:gap-32 bg-slate-200 flex flex-col md:flex-row justify-center items-center bg-[linear-gradient(#00d9ff77,#8af2c733)] h-screen"
    >
      <section className="w-[calc(120px*1.3818)] h-[120px] | md:w-[calc(180px*1.3818)] md:h-[180px]">
        {/* <img
          // className="w-full h-full filter invert-[100%] drop-shadow-[3px_3px_3px_cyan]"
          className="w-full h-full drop-shadow-[2px_2px_1px_#00000066]"
          src={logo_kmb}
          alt="kmb_imagen"
        /> */}
      </section>
      <Form />
      <div className={`absolute bottom-[-2px] left-0 h-[200px] w-full `}>
        <div
          className={`${styles.wave} ${styles.wave1} ${styles.animation_move_x}`}
        ></div>
        <div
          className={`${styles.wave} ${styles.wave2} ${styles.animation_move_x2}`}
        ></div>
      </div>
    </main>
  );
};

export default LoginPage;
