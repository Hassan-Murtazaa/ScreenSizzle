import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './MovieSlider.css';
import theatre_Img from './theatre-Img.jpg';
import { useEffect } from 'react';
import Navbar from '../Nav/Navbar';

export default function Action(props) {
    useEffect(() => {
        window.scrollTo(0, 0); // scroll to top of page
    }, []);

    return (
        <>
            <Navbar />
            <div className='actionn'>
                <div id="carouselExampleSlidesOnly" class="carousel slide overlay" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block w-100 backImg" src={theatre_Img} alt="" />
                            <Carousel className='centered caro'>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={props.image1}
                                        alt="Loading..."
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={props.image2}
                                        alt="Loading..."
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={props.image3}
                                        alt="Loading..."
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}