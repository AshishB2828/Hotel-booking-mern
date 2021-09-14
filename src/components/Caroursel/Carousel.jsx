import React from 'react'
import {Carousel} from 'react-bootstrap'

const Carousels = ({imageurls}) => {
    return (
        <Carousel>
        {
            imageurls.map((img,index) => <Carousel.Item key={index}>
                                    <img
                                    className="d-block w-100 img-fluid "
                                    src={img}
                                    alt="Second slide"
                                    />
                                </Carousel.Item>
                            )}       
        </Carousel>
    )
}

export default Carousels
