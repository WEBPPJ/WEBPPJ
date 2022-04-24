import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import video from '../assets/video.mp4'
import axios from "axios"
import { Alert } from "react-bootstrap";



const Login = () => {

  const [inputs, setInputs] = useState({ code: "", password: "" });
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const HandleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

   const onSubmit = async (e) => {
     e.preventDefault();
    if (code !== "" && password !== "") {
      const user = {
        code,
        password,
       };
       setLoading(true);
       await axios
         .post("http://localhost:3001/api/users/login", user)
         .then((res) => {
           const { data } = res;
           setTimeout(() => {
             console.log(data.role)
             setMessage("");
             if (data.role==='user'){
              console.log(data.role)
              navigate(`/plans/${user.code}`);
             }
             if (data.role==='support'){
              console.log(data.role)
              navigate(`/users/${user.code}`);
             }
             if (data.role==='admin'){
              console.log(data.role)
              navigate(`/plan/${user.code}`);
             }
           }, 1500);
         })
         .catch((error) => {
           console.error(error);
           setMessage(error.response.data.msg);
           setTimeout(() => {
             setMessage("");
           }, 1500);
         });
       setInputs({code: "", password: "" });
       setLoading(false);
     }
   };

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
                type="number"
                min="0"
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
          <button type="submit"onClick={(e)=>onSubmit(e)}>
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
        {
          message && <div className="pt-2">
          <Alert variant="danger">
            <p>
              {message}
            </p>
          </Alert>
        </div>
        }
      </div>
       
    </div>
  )
}

export default Login