import React from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
// import Nav from 'react-bootstrap/Nav';
import './MovieClasses.css';
import Footer from '../Foot/Footer';

export default function ActionList(props) {

    const Text = props.text;

    return (
        <>
            <div className='actionList'>
                {props.array.length > 0 &&
                    <div className='List'>
                        <ul className='List2 d-flex justify-content-center gap-4 flex-md-row flex-wrap col-10 mt-5 mb-5'>
                            {props.array.map((movies) =>
                                <li>
                                    <Link to={`/movies/${Text}/${movies.name}`} >
                                        <Card className='cont' style={{ width: '22rem' }} >
                                            <div className='image-box'>
                                                <Card.Img variant="top" src={movies.picture} />
                                            </div>
                                            <Card.Body>
                                                <Card.Title>{movies.name}</Card.Title>
                                                <p>{movies.about}</p>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                }
            </div>
            <Footer />
        </>
    )
}