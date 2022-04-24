import { Container, Row, Col, Card, Button } from "react-bootstrap";
import useAuth from '../auth/useAuth';



export default function AccountPage() {
    const user = useAuth();

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
                        <p className="text-center"><b>Nombre: </b></p>
                        <p className="text-center"><b>Rol: </b></p>
                        <Button variant="link" className="mt-1">
                            Cambiar contraseña
                        </Button>
                    </Card>
                </Col>                
            </Row>
        </Container>
    )
}