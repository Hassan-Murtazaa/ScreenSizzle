import Button from 'react-bootstrap/Button';
import collage from './collage.jpg';
import { BsFillBellFill } from 'react-icons/bs';
import { Outlet, Link } from "react-router-dom";
import './Header.css';
import { useEffect, useState } from 'react';
import Navbar from '../Nav/Navbar';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useRef } from 'react';

function Header() {

    useEffect(() => {
        window.scrollTo(0, 0); // scroll to top of page
    }, []);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const textInput = useRef(null);

    function validation() {
        var para = document.getElementById("mail_Error");

        if (para.style.display == "inline-block") {
            para.style.display = "none";
        }

        let for_mail = textInput.current.value;

        var atpos = for_mail.indexOf("@");
        var dotpos = for_mail.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= for_mail.length) {
            para.innerHTML = "* Invalid email address";
            para.style.display = "inline-block";
            para.style.color = "red";
        }

        else {
            para.innerHTML = "Subscribed!";
            para.style.display = "inline-block";
            para.style.color = "green";
        }
    }

    return (
        <>
            <Navbar />
            <div className='collagge'>
                <div id="carouselExampleSlidesOnly" class="carousel slide overlay" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block w-100" src={collage} alt="" />
                            <div className="centered">
                                <h1> <b>ScreenSizzle</b></h1>
                                <div className='d-grid mt-4'>
                                    <Button className='bCustom' onClick={handleShow}>
                                        <BsFillBellFill style={{ marginRight: '10px' }} /><small>SUBSCRIBE US</small>
                                    </Button>
                                    <Modal
                                        show={show}
                                        onHide={handleClose}
                                        backdrop="static"
                                        keyboard={false}
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                    >
                                        <Modal.Body>
                                            <Form>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label><b>Email address</b></Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="name@example.com"
                                                        ref={textInput}
                                                    />
                                                </Form.Group>
                                                <p id="mail_Error" style={{ display: 'none' }}></p>
                                            </Form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button onClick={validation} style={{backgroundColor : '#1CE783', border: 'none'}}>Done</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to="/"></Link>
                <Outlet />
            </div>
        </>
    );
}

export default Header;