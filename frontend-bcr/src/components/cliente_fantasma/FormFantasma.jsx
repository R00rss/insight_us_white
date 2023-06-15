import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { colors_produ } from "../../constants/colors";
import { getToken } from "../../functions/general";
import {
  getDataInicialFiltros3,
  get_data_filtros_fantasma,
  get_plantilla_fantasma,
} from "../../services/getDataFiltros";
import { validateToken } from "../../services/token";
import { minimizeStr } from "../../functions/manageStr";
import simpleAlert from "../../utils/manageAlerts";

function get_medicion_from_date(date) {
  const month = date.slice(5, 7);
  if (month >= 1 && month <= 4) return "M1";
  if (month >= 5 && month <= 8) return "M2";
  if (month >= 9 && month <= 12) return "M3";
  return "M1";
}

export default function FormFantasma({ handle_submit, handle_video }) {
  const [zonas, set_zonas] = useState({});
  const [cities, set_cities] = useState([]);
  const [agencias, set_agencias] = useState([]);
  const [fecha, set_fecha] = useState(new Date().toISOString().slice(0, 10));
  const [cities_filtered, set_cities_filtered] = useState([]);
  const [agencias_filtered, set_agencias_filtered] = useState([]);

  const [selected_medicion, set_selected_medicion] = useState("");
  const [selected_zona, set_selected_zona] = useState("");
  const [selected_city, set_selected_city] = useState("");
  const [selected_tipo_agencia, set_selected_tipo_agencia] = useState("");
  const [selected_agencia, set_selected_agencia] = useState("");
  const [cajero, set_cajero] = useState("");

  const [flag_exist, set_flag_exist] = useState(false);

  const navigate = useNavigate();

  function handle_submit_(e) {
    e.preventDefault();
    const data = {
      medicion: selected_medicion,
      zona: selected_zona,
      ciudad: selected_city,
      agencia: selected_agencia,
      tipo_agencia: selected_tipo_agencia,
      cajero: cajero,
      fecha: fecha,
    };
    console.log(data);
    const flag = handle_submit(data);
    if (flag) {
      set_cajero("");
    }
  }

  useEffect(() => {
    set_selected_medicion(get_medicion_from_date(fecha));
  }, [fecha]);

  useEffect(() => {
    const token = getToken();
    if (!token) navigate("/login");
    validateToken(token).then((data) => {
      if (!data || !("success" in data) || !data.success) navigate("/login");
    });
    getDataInicialFiltros3().then((res) => {
      console.log(res);
      if (!res) navigate("/login");
      // set_mediciones(res[0]);
      set_zonas(res[0]);
      set_cities(res[1]);
      set_agencias(res[3]);
    });
  }, []);

  useEffect(() => {
    if (Object.keys(zonas).length === 0) return;
    if (Object.keys(cities).length === 0) return;
    let selected_zona;
    for (const zona in zonas)
      if (zonas[zona].selected) {
        console.log(zona);
        selected_zona = zona;
        break;
      }
    const cities_filtered_aux = cities.filter((city) => {
      return city.zona == selected_zona;
    });
    if (cities_filtered_aux.length === 0) return;
    cities_filtered_aux.forEach((city, i) => (city.selected = i == 0));
    set_selected_city(cities_filtered_aux[0].name);
    set_selected_zona(selected_zona);
    set_cities_filtered(cities_filtered_aux);
  }, [zonas]);

  useEffect(() => {
    if (cities_filtered.length === 0) return;
    if (agencias.length === 0) return;
    let selected_zona;
    let selected_city;
    for (const zona in zonas)
      if (zonas[zona].selected) {
        selected_zona = zona;
        break;
      }
    for (const city in cities_filtered)
      if (cities_filtered[city].selected) {
        selected_city = cities_filtered[city].name;
        break;
      }
    const agencias_filtered_aux = agencias.filter(
      (agencia) =>
        agencia.zona == selected_zona && agencia.ciudad == selected_city
    );
    if (agencias_filtered_aux.length === 0) return;
    agencias_filtered_aux.forEach((agencia, i) => (agencia.selected = i == 0));
    set_selected_agencia(agencias_filtered_aux[0].name);
    set_selected_tipo_agencia(agencias_filtered_aux[0].tipo_agencia);
    set_agencias_filtered(agencias_filtered_aux);
  }, [cities_filtered]);

  useEffect(() => {
    const data_aux = {
      zona: selected_zona,
      ciudad: selected_city,
      agencia: selected_agencia,
      medicion: selected_medicion,
    };
    console.log(data_aux);
    get_plantilla_fantasma(data_aux).then((res) => {
      console.log(res);
      if (res && res.cajero && res.fecha !== null && res.items) {
        set_flag_exist(true);
        set_cajero(res.cajero);
      } else {
        set_flag_exist(false);
        set_cajero("");
      }
    });
  }, [selected_agencia, selected_zona, selected_city, selected_medicion]);

  useEffect(() => {
    if (!flag_exist) return;
    simpleAlert(
      "Ya existe una plantilla para esta agencia, fecha y medición",
      "warning",
      "Alerta"
    );
  }, [flag_exist]);

  const user_info = useSelector((state) => state.userData.value);
  return (
    <form
      onSubmit={handle_submit_}
      className="w-[min(90%,320px)] flex flex-col justify-center items-center"
    >
      <div className="flex flex-row gap-0 mb-1 h-8 shadow-[2px_2px_5px_-2px_#000000] w-full">
        <div
          style={{
            backgroundColor: colors_produ.green_secondary.dark,
          }}
          className="px-2 w-[120px] font-medium flex justify-center items-center"
        >
          <p>Ingresador</p>
        </div>
        <div className="bg-[#EFEFEF] flex-grow pl-2 outline-none focus:outline-none">
          {user_info.name}
        </div>
      </div>
      <div className="flex flex-row gap-0 mb-1 h-8 shadow-[2px_2px_5px_-2px_#000000] w-full">
        <div
          style={{
            backgroundColor: colors_produ.green_secondary.dark,
          }}
          className="px-2 w-[120px] font-medium flex justify-center items-center"
        >
          <p>Medición</p>
        </div>
        <div className="bg-[#EFEFEF] pl-2 flex-grow outline-none focus:outline-none">
          {selected_medicion}
        </div>
      </div>
      <div className="flex flex-row gap-0 mb-1 h-8 shadow-[2px_2px_5px_-2px_#000000] w-full">
        <div
          style={{
            backgroundColor: colors_produ.green_secondary.dark,
          }}
          className="px-2 w-[120px] font-medium flex justify-center items-center"
        >
          <p>Zonas</p>
        </div>
        <select
          onChange={(e) => {
            const zonas_clone = JSON.parse(JSON.stringify(zonas));
            Object.keys(zonas_clone).map((zona_key) => {
              zonas_clone[zona_key].selected = e.target.value === zona_key;
            });
            set_zonas(zonas_clone);
            set_selected_zona(e.target.value);
          }}
          className=" px-1 flex-grow outline-none focus:outline-none"
        >
          {Object.keys(zonas).map((zona_key, j) => {
            return (
              <option key={j} value={zona_key}>
                {zonas[zona_key].display_name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-row gap-0 mb-1 h-8 shadow-[2px_2px_5px_-2px_#000000] w-full">
        <div
          style={{
            backgroundColor: colors_produ.green_secondary.dark,
          }}
          className="px-2 w-[120px] font-medium flex justify-center items-center"
        >
          <p>Ciudades</p>
        </div>
        <select
          onChange={(e) => {
            set_cities_filtered(
              cities_filtered.map((city) => {
                return {
                  ...city,
                  selected: e.target.value === city.name,
                };
              })
            );
            set_selected_city(e.target.value);
          }}
          className=" px-1 flex-grow outline-none focus:outline-none"
        >
          {cities_filtered.map((city) => {
            return (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-row gap-0 mb-1 h-8 shadow-[2px_2px_5px_-2px_#000000] w-full">
        <div
          style={{
            backgroundColor: colors_produ.green_secondary.dark,
          }}
          className="px-2 w-[120px] font-medium flex justify-center items-center"
        >
          <p>Tipo agencia</p>
        </div>
        <div className="bg-[#EFEFEF] flex-grow pl-2 outline-none focus:outline-none">
          {selected_tipo_agencia}
        </div>
      </div>
      <div className="flex flex-row gap-0 mb-1 h-8 shadow-[2px_2px_5px_-2px_#000000] w-full">
        <div
          style={{
            backgroundColor: colors_produ.green_secondary.dark,
          }}
          className="px-2 w-[120px] font-medium flex justify-center items-center"
        >
          <p>Agencia</p>
        </div>
        <select
          onChange={(e) => {
            set_agencias_filtered(
              agencias_filtered.map((agencia) => {
                if (e.target.value === agencia.name) {
                  set_selected_tipo_agencia(agencia.tipo_agencia);
                }
                return {
                  ...agencia,
                  selected: e.target.value === agencia.name,
                };
              })
            );
            set_selected_agencia(e.target.value);
          }}
          className="px-1 flex-grow outline-none focus:outline-none bg-[#efefef]"
        >
          {agencias_filtered.map((agencia) => {
            return (
              <option key={agencia.id} value={agencia.name}>
                {minimizeStr(agencia.name, 16)}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-row gap-0 mb-1 h-8 shadow-[2px_2px_5px_-2px_#000000] w-full">
        <div
          style={{
            backgroundColor: colors_produ.green_secondary.dark,
          }}
          className="px-2 w-[120px] font-medium flex justify-center items-center"
        >
          <p>Fecha</p>
        </div>
        <input
          type="date"
          className="px-1 flex-grow outline-none focus:outline-none bg-[#efefef]"
          onChange={(e) => set_fecha(e.target.value)}
          value={fecha}
        />
      </div>
      <div className="flex flex-row gap-0 mb-1 h-8 shadow-[2px_2px_5px_-2px_#000000] w-full">
        <div
          style={{
            backgroundColor: colors_produ.green_secondary.dark,
          }}
          className="px-2 w-[120px] font-medium flex justify-center items-center"
        >
          <p>Cajero</p>
        </div>
        <input
          readOnly={flag_exist}
          type="text"
          className="
          read-only:cursor-not-allowed read-only:opacity-50
          px-1 flex-grow outline-none focus:outline-none bg-[#efefef]"
          onChange={(e) => set_cajero(e.target.value)}
          value={cajero}
          required
        />
      </div>
      <div className="w-[min(90%,400px)] flex flex-row justify-center items-center gap-2">
        <button
          disabled={flag_exist}
          onClick={handle_video}
          type="button"
          className={`
          disabled:opacity-50 disabled:cursor-not-allowed
          text-slate-100
          px-2 duration-300 h-[40px] rounded-[10px] bg-[var(--green-produ-primary)] font-medium mt-2 hover:bg-transparent border-2 border-[var(--green-produ-primary)] hover:text-[var(--green-produ-primary)]`}
        >
          Agregar video
        </button>
        <button
          type="submit"
          disabled={flag_exist}
          // onClick={handle_submit_}
          className={`
          disabled:opacity-50 disabled:cursor-not-allowed
          flex-grow px-2 duration-300 h-[40px] rounded-[10px] bg-slate-200 font-medium mt-2 hover:bg-transparent border-2 border-slate-200 shadow-[1px_1px_10px_-4px]`}
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
