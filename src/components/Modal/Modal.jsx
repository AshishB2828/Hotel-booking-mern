import React from 'react'
import{Modal, Button} from 'react-bootstrap'
import Carousels from '../Caroursel/Carousel'

const Modals = (props) => {
    return (
        <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
           {props.room.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousels imageurls={props.room.imageurls} />
          {props.room.description.substring(0,100)}
        </Modal.Body>
        <Modal.Footer>
          <Button className="card__btn" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default Modals
