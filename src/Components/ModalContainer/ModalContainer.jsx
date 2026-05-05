import React from 'react'
import { Modal } from 'react-bootstrap'

const ModalContainer = ({lgShow, setLgShow, movieDetails = {}}) => {
    return (
        <div>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {movieDetails.title}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className='d-flex justify-content-center flex-column'>
                    <img src={`https://image.tmdb.org/t/p/w500/` + movieDetails.backdrop_path} />
                    <br></br>
                    <h4>{movieDetails.overview}</h4>
                    <h6 className='text-secondary'>Release Date: {movieDetails.release_date}</h6>
                    {/* <h5 className={`${movieDetails.adults? 'text-dark' : 'text-warning'}`}>Recommended for Children</h5> */}

                </Modal.Body>

            </Modal>


        </div>
    )
}

export default ModalContainer

