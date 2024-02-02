import Card from 'react-bootstrap/Card';
import './Categories.css';
import { Link } from "react-router-dom";
import Footer from '../Foot/Footer';

function BasicExample() {
    return (
        <>
            <div className='categoriees'>
                <div className='text-center pad-top'>
                    <h1 style={{ margin: '0' }}><b>All The Movies You Love</b></h1>
                </div>

                <div className='cat'>
                    <div>
                        <nav>
                            <ul className='cat2 d-flex justify-content-center gap-4 flex-md-row flex-wrap mt-5 mb-5'>
                                <li>
                                    <Link to="/movies/action">
                                        <Card className='cont' style={{ width: '18rem' }}>
                                            <div className='image-box'>
                                                <Card.Img variant="top" src="https://c4.wallpaperflare.com/wallpaper/675/275/718/joker-2019-movie-joker-joaquin-phoenix-actor-men-hd-wallpaper-preview.jpg" />
                                            </div>
                                            <Card.Body>
                                                <Card.Title style={{ paddingTop: '5px' }}><b>Action</b></Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/movies/comedy">
                                        <Card className='cont sm= {mt-3}' style={{ width: '18rem' }}>
                                            <div className='image-box'>
                                                <Card.Img variant="top" src="https://c4.wallpaperflare.com/wallpaper/627/106/403/action-ghostbusters-comedy-2016-movies-wallpaper-preview.jpg" />
                                            </div>
                                            <Card.Body>
                                                <Card.Title style={{ paddingTop: '6px' }}><b>Comedy</b></Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/movies/horror">
                                        <Card className='cont' style={{ width: '18rem' }}>
                                            <div className='image-box'>
                                                <Card.Img variant="top" src="https://c4.wallpaperflare.com/wallpaper/780/794/574/michael-myers-vertical-halloween-kills-horror-mask-hd-wallpaper-preview.jpg" />
                                            </div>
                                            <Card.Body>
                                                <Card.Title><b>Horror</b></Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/movies/romance">
                                        <Card className='cont' style={{ width: '18rem' }}>
                                            <div className='image-box'>
                                                <Card.Img variant="top" src="https://wallpaper.dog/large/10713136.jpg" />
                                            </div>
                                            <Card.Body>
                                                <Card.Title style={{ paddingTop: '6px' }}><b>Romance</b></Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </li>
                            </ul>
                        </nav >
                    </div >
                </div >
            </div>
            <Footer />
        </>
    );
}

export default BasicExample;