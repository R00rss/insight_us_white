import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../../services/token";
const ValidateJWT = ({ children }) => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      validateToken(token).then((data) => {
        if (data && "success" in data && data.success) {
          setFlag(true);
          // alert("verificación correcta!");
        } else {
          navigate("/login");
          // alert("verificación incorrecta!");
        }
      });
    } else {
      navigate("/login");
      // alert("no existe token en el sesión storage");
    }
  }, []);

  return <>{flag && children}</>;
};

export default ValidateJWT;
