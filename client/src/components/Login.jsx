import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import video from '../assets/video.mp4'


const Login = () => {

  const [inputs, setInputs] = useState({ code: "", password: "" });
  const [mensaje, setMensaje] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const HandleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //TODO: Crear codigo para enviar la info del formulario al server, ej (En este caso, instalar axios):
  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   if (correo !== "" && contraseña !== "") {
  //     const Usuario = {
  //       correo,
  //       contraseña,
  //     };
  //     setLoading(true);
  //     await axios
  //       .post("http://localhost:4000/login", Usuario)
  //       .then((res) => {
  //         const { data } = res;
  //         setMensaje(data.mensaje);
  //         setTimeout(() => {
  //           setMensaje("");
  //           navigate(`/welcome/${data?.usuario.id}`);
  //         }, 1500);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         setMensaje("Correo u contraseña incorrecta");
  //         setTimeout(() => {
  //           setMensaje("");
  //         }, 1500);
  //       });
  //     setInputs({ correo: "", contraseña: "" });
  //     setLoading(false);
  //   }
  // };

  const { code, password } = inputs;

  return (
    <div className="box">
      
      <video className='video'
        autoPlay
        loop
        muted>
        <source src={video} type="video/mp4"/>
      </video>

      <div className="formContainer">
        <h3>Bienvenido a la pagina</h3>
        <h2>De Inicio de Sesión!</h2>
        <form>
          <div className="inputContainer">
            <div className="left">
              <label htmlFor="code">Código</label>
              <input
                onChange={(e) => HandleChange(e)}
                value={code}
                name="code"
                id="code"
                type="email"
                placeholder="Código..."
                autoComplete="off"
              />
            </div>
          </div>

          <div className="inputContainer">
            <div className="left">
              <label htmlFor="password">Contraseña</label>
              <input
               onChange={(e) => HandleChange(e)}
                value={password}
                name="password"
                id="password"
                type="password"
                placeholder="Contraseña..."
                autoComplete="off"
              />
            </div>
          </div>
          <button type="submit">
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
        {mensaje && <div className="toast">{mensaje}</div>}
    </div>
  )
}

export default Login