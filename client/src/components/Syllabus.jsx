import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Alert, Button, Container, Modal, Row, Toast, ToastContainer } from 'react-bootstrap'
import SyllabusCard from './SyllabusCard'


const initialSyll = {
  _id: 0,
  title: '',
}

const Syllabus = () => {

  const [syllabus, setSyllabus] = useState([])
  const [newSyllabus, setNewSyllabus] = useState(initialSyll)
  const [addModal, setAddModal] = useState(false)
  const [toast, setToast] = useState(false)
  const [msg, setMsg] = useState('')
  //TODO: Arreglar para que funcione con MongoDB
  const handleChange = (e) => {
    const { name, value } = e.target
    setNewSyllabus((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  useEffect(()=>{
    loadSyllabus()
  },[])
 
  

  const add = () => {
    var newSyll = newSyllabus
    var newSylls = syllabus
    newSylls.push(newSyll)
    setSyllabus(newSylls)
    console.log(newSylls)
    setAddModal(false)
  }

  const deleteSyll = (id) => {
    setSyllabus(syllabus.filter(syll => syll._id !== id))
    //! Si se realiza esta comparacion se muestra el toast, demostrando que puede que la falla este en el filter, por lo tanto, al agregar la bd, puede que funcione correctamente
    // setSyllabus(syllabus.filter(syll => syll._id === id))
    console.log(id);
    console.log(syllabus);
  }

  const edit = (selectedSyll) => {
    var newSylls = syllabus
    newSylls.map(syll => {
      if (syll._id === selectedSyll._id) {
        syll.name = selectedSyll.name
      }
    })
    setSyllabus(newSylls)
  }
  const onSubmit = async (e) => {
    e.preventDefault();
   if (newSyllabus.title=="") {
    setMsg("Ingrese un nombre")
    setToast(true)
    }else{
      const title=newSyllabus.title
      const syllabus = {
        title,
      }
      await axios
        .post("http://localhost:3001/api/syllabus/", syllabus)
        .then((res) => {
          const { data } = res;
          setTimeout(() => {
            setMsg(data)
            setToast(true)
            setAddModal(false)
            loadSyllabus()
           
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          setMsg(error.response.data.msg)
          setToast(true)
          setTimeout(() => {
            
          }, 1500);
        }); 
      
    }
  }
  const remove = async (e, id) => {   
    e.preventDefault();
     const _id=id
     const syllabus={_id}
      await axios
        .post("http://localhost:3001/api/syllabus/remove", syllabus)
        .then((res) => {
          const { data } = res;
          setTimeout(() => {
            setMsg(data)
            setToast(true)
            setAddModal(false)
            loadSyllabus()
           
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          setMsg(error.response.data.msg)
          setToast(true)
          setTimeout(() => {
            
          }, 1500);
        }); 
  };
  
  const loadSyllabus =  async () => {

    await axios.get('http://localhost:3001/api/syllabus/all')
    .then((res) => {
      const { data } = res;
      setTimeout(() => {
        setSyllabus(data)
        
       
      }, 1500);
    })
}


  return (
    <Container className='p-4'>
      <Row md="6" className='d-grid gap-2 d-md-flex justify-content-md-end mb-2'>
        <Button className='rounded-pill' onClick={() => setAddModal(true)}>Agregar Plan de Estudio</Button> {/*<IconContext.Provider value={{size: "2em" }}><AiFillFolderAdd/></IconContext.Provider> */}
      </Row>
      <Row>
        {syllabus.length === 0
          ? (
            <Alert variant='primary'>Sin planes de estudio</Alert>
          )
          : (
            syllabus.map((element) => (
              <SyllabusCard initialSyll={initialSyll} deleteSyll={deleteSyll} edit={edit} remove={remove} syllabus={element} key={element._id} />
              
            ))
          )
        }
      </Row>

      {/* Modal de Agregar */}
      <Modal show={addModal}>
        <Modal.Header>
          <div>
            <h3>Agregar Plan de Estudio</h3>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            
            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="title"
              onChange={handleChange}
            />
            <br />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            onClick={(e) => {
              onSubmit(e)
            }}
          >
            Agregar
          </Button>
          <Button
            variant='outline-secondary'
            onClick={() => setAddModal(false)}
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast (Alerta) */}
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

export default Syllabus