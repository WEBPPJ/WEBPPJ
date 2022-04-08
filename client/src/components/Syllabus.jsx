import React, { useState } from 'react'
import { Alert, Button, Container, Modal, Row } from 'react-bootstrap'
import SyllabusCard from './SyllabusCard'

const data = [
  {
    _id: 123131223,
    name: 'MERN',
    links: [
      {
        _id: 23131,
        link: 'http://localhost:3000/syllabus'
      },
      {
        _id: 1231,
        link: 'http://localhost:3000/syllabus'
      },
      {
        _id: 21343,
        link: 'http://localhost:3000/syllabus'
      },
    ]
  },
  {
    _id: 123133421223,
    name: 'SpringBoot',
    links: [
      {
        _id: 213131,
        link: 'http://localhost:3000/syllabus'
      },
      {
        _id: 12331,
        link: 'http://localhost:3000/syllabus'
      },
      {
        _id: 214343,
        link: 'http://localhost:3000/syllabus'
      },
    ]
  },
]

const initialSyll = {
  _id: 0,
  name: '',
  links: {
    _id: 0,
    link: ''
  }
}

const Syllabus = () => {

  const [syllabus, setSyllabus] = useState(data)
  const [newSyllabus, setNewSyllabus] = useState(initialSyll)
  const [addModal, setAddModal] = useState(false)

  //TODO: Arreglar para que funcione con MongoDB

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewSyllabus((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const add = () => {
    var newSyll = newSyllabus
    var newSylls = syllabus
    newSylls.push(newSyll)
    setSyllabus(newSylls)
    console.log(newSylls);
    setAddModal(false)
  }

  const deleteSyll = (id) => {
    setSyllabus(syllabus.filter(syll => syll._id !== id))
    console.log(id);
    console.log(syllabus);
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
              <SyllabusCard deleteSyll={deleteSyll} syllabus={element} key={element._id} />
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
            <label>ID</label>
            <input
              className="form-control"
              type="text"
              name="_id"
              onChange={handleChange}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={handleChange}
            />
            <br />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            onClick={() => add()}
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

    </Container>
  )
}

export default Syllabus