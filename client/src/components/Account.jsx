import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Toast, ToastContainer } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAuth from '../auth/useAuth';



export default function AccountPage() {
    const [user, setUser] = useState({});
    const [newPassword, setNewPassword] = useState();
    const [passwordModal, setPasswordModal]=useState(false)
    const [toast, setToast] = useState(false)
    const [msg, setMsg] = useState('')
    const {code}=useParams()
    const loadUserData = () => {
        fetch(`http://localhost:3001/api/users/data/${code}`)
            .then(response => response.json())
            .then(user => setUser(user))
    }
    useEffect(() => {
        loadUserData()
      }, [])
    
      const handleChange = (e) => {
        const { name, value } = e.target
        setNewPassword((prevState) => ({
          ...prevState,
          [name]: value
        }))
      }

      const changePassword = async (e,userCode ) => {
        e.preventDefault();
           const code=userCode
           const password=newPassword.password
         const user = {
           code,
           password
        }

        if( password==undefined || password.legth<=5 ){
            setMsg("La contraseña debe tener mas de 4 caracteres")
            setToast(true)
        }else{
        console.log(password)
          await axios
            .post("http://localhost:3001/api/users/password", user)
            .then((res) => {
              const { data } = res;
              setTimeout(() => {
                setPasswordModal(false)
                setMsg("Contraseña actualizada correctamente")
                setToast(true)
                setNewPassword('')
                
               
              }, 1500);
            })
            .catch((error) => {
              console.error(error);
              setTimeout(() => {
                
              }, 1500);
            });
        }
      };  
    return (
        
        <Container>
            <Row className="mt-4">
                <Col xs={12}>
                    <img
                        src="/img/female_avatar.svg"
                        alt="profile"
                        style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                        }}
                        /> 
                </Col>
                <Col className="mt-4">
                    <Card style={{ maxWidth: '360px' }} className="mx-auto p-4">
                        <p className="text-center"><b>Código de usuario: {user.code}</b></p>
                        {user.role=='user'&&<p className="text-center"><b>Rol: Usuario</b></p>}
                        {user.role=='support'&&<p className="text-center"><b>Rol: Soporte</b></p>}
                        {user.role=='admin'&&<p className="text-center"><b>Rol: Administrador</b></p>}
                        <Button  className="mt-1" onClick={()=>
                            setPasswordModal(true)
                        }>
                            Cambiar contraseña
                        </Button>
                    </Card>
                </Col>                
            </Row>
            {/*Modal de contraseña */}
            <Modal show={passwordModal}>
                <Modal.Header>
                    <div>
                        <h3>Cambio de contraseña</h3>
                    </div>
                </Modal.Header>
                <Modal.Body>
                <div className="form-group">
                    <label>Nueva contraseña</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        onChange={handleChange}
                    />
                    <br />
                </div>      
                   
                </Modal.Body>
                <Modal.Footer>
                    <Button
                    onClick={(e) => {
                        changePassword(e, user.code)
                    }}
                        variant="success"
                    >
                        Cambiar
                    </Button>
                    <Button
                        variant="outline-secondary"
                        onClick={(e) => {
                            setPasswordModal(false)
                        }}
                    >
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        <ToastContainer className='p-3' position='top-end'>
        <Toast onClose={() => setToast(false)} show={toast} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">WEBPPJ</strong>
          </Toast.Header>
          <Toast.Body>{msg}</Toast.Body>
        </Toast>
      </ToastContainer>
        </Container>
    )
}