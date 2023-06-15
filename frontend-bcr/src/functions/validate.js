import { validateToken } from "../services/token";
import { getToken } from "./general";
import { setUserData } from "../redux/sliders/Login/userSlider";
import simpleAlert from "../utils/manageAlerts";

export function validateSession(dispatch) {
  const token = getToken();
  if (!token) {
    simpleAlert(
      "Session no valida, por favor inicie sesion",
      "error",
      "Error de session"
    );
    window.location.href = "/login";
  } else {
    validateToken(token).then((data) => {
      if (data) {
        if ("success" in data && data.success) {
          dispatch(setUserData({ data: data.payload }));
        } else {
          simpleAlert(
            "Session no valida, por favor inicie sesion",
            "error",
            "Error de session"
          );
          window.location.href = "/login";
        }
      } else {
        simpleAlert(
          "Error al intentar validar el token",
          "error",
          "Error de session"
        );
        window.location.href = "/login";
      }
    });
  }
}
