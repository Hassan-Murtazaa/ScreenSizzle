import React from 'react';
import './DetailPage.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaPlay } from "react-icons/fa";
import { GiTicket } from "react-icons/gi";
import Actor from './Actor.js';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import Navbar from '../Nav/Navbar';
import Footer from '../Foot/Footer';

function DetailPage(props) {

    useEffect(() => {
        window.scrollTo(0, 0); // scroll to top of page
    }, []);

    function handleClick() {
        const element = document.getElementById('YoutubeLink');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    let imggg;

    if (props.array.name === 'Jumanji: The Next Level') {
        imggg = props.Jumanji1
    }

    else if (props.array.name === 'Avengers: Infinity War') {
        imggg = props.Avengers1
    }

    else if (props.array.name === 'Avatar: The Way of Water') {
        imggg = props.Avatar1
    }

    else if (props.array.name === 'Jungle Cruise') {
        imggg = props.Jungle1
    }

    else if (props.array.name === 'Doctor Strange in the Multiverse of Madness') {
        imggg = props.Doctor1
    }

    else if (props.array.name === 'Zack Snyder`s Justice League') {
        imggg = props.Justice1
    }

    else if (props.array.name === 'Deadpool 2') {
        imggg = props.Dead1
    }

    else if (props.array.name === 'John Wick: Chapter 4') {
        imggg = props.John1
    }

    else if (props.array.name === 'Black Adam') {
        imggg = props.Adam1
    }

    else if (props.array.name === 'Puss in Boots: The Last Wish') {
        imggg = props.Puss1
    }

    else if (props.array.name === 'Johnny English Strikes Again') {
        imggg = props.English1
    }

    else if (props.array.name === 'Toy Story 4') {
        imggg = props.Toy1
    }

    else if (props.array.name === 'Bruce Almighty') {
        imggg = props.Bruce1
    }

    else if (props.array.name === 'The Mask') {
        imggg = props.Mask1
    }

    else if (props.array.name === 'The Bad Guys') {
        imggg = props.Bad1
    }

    else if (props.array.name === 'Tom and Jerry') {
        imggg = props.Jerry1
    }

    else if (props.array.name === 'Everything Everywhere All at Once') {
        imggg = props.Everything1
    }

    else if (props.array.name === 'Once Upon a Time... in Hollywood') {
        imggg = props.Hollywood1
    }

    else if (props.array.name === 'Five Feet Apart') {
        imggg = props.Five1
    }

    else if (props.array.name === 'Dear John') {
        imggg = props.JohnR1
    }

    else if (props.array.name === 'Last Christmas') {
        imggg = props.Last1
    }

    else if (props.array.name === 'The Proposal') {
        imggg = props.Proposal1
    }

    else if (props.array.name === '50 First Dates') {
        imggg = props.Dates1
    }

    else if (props.array.name === 'The Last Letter from Your Lover') {
        imggg = props.Letter1
    }

    else if (props.array.name === 'The Longest Ride') {
        imggg = props.Ride1
    }

    else if (props.array.name === 'Midnight Sun') {
        imggg = props.Sun1
    }

    else if (props.array.name === 'A Star is Born') {
        imggg = props.Star1
    }

    else if (props.array.name === 'Scream VI') {
        imggg = props.Scream1
    }

    else if (props.array.name === 'Hereditary') {
        imggg = props.Hereditary1
    }

    else if (props.array.name === 'Renfield') {
        imggg = props.Renfield1
    }

    else if (props.array.name === 'Knock at the Cabin') {
        imggg = props.Knock1
    }

    else if (props.array.name === 'M3GAN') {
        imggg = props.M3GAN1
    }

    else if (props.array.name === 'Terrifier 2') {
        imggg = props.Terrifier1
    }

    else if (props.array.name === 'The Forever Purge') {
        imggg = props.Purge1
    }

    else if (props.array.name === 'The New Mutants') {
        imggg = props.Mutant1
    }

    else if (props.array.name === 'Evil Dead Rise') {
        imggg = props.Evil1
    }

    return (
        <>
            <Navbar />
            <div className='Main-Div-Detail-Page'>
                <img className="d-block w-100" src={imggg} alt="Loading..." />

                <div className='WholeInnerInfo mb-5'>
                    <div className='heading'>
                        <h4 className="Filmname">{props.array.name}</h4>
                    </div>
                    <span className="CategorySection">{props.category}</span>
                    <p className="FilmDescription">{props.array.about}</p>
                    <Button className='DetailPageButton' onClick={handleClick}> <FaPlay /> <b>Watch Trailer</b> </Button>
                    <Link to={`/movies/${props.cat}/${props.array.name}/Book Ticket`}>
                        <Button className='DetailPageButton' style={{ marginLeft: 10 }} ><GiTicket /> <b> Book Ticket</b> </Button>
                    </Link>
                </div>
                <Actor n={props.array.name} category={props.cat} />

                <iframe id="YoutubeLink" src={props.array.link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ></iframe>
                <h1 className='AlsoLike' >You May Also Like</h1>

                <div className='List'>
                    <div className='List2 d-flex justify-content-center gap-4 flex-md-row flex-wrap col-10 mt-5 mb-5'>
                        <Card className='cont' style={{ width: '22rem' }}>
                            <div className='image-box'>
                                <Card.Img variant="top" src="https://e1.pxfuel.com/desktop-wallpaper/884/915/desktop-wallpaper-the-longest-ride.jpg" />
                            </div>
                            <Card.Body>
                                <Card.Title>The Longest Ride</Card.Title>
                                <p>The spark between Luke and Sophia fades away owing to their conflicting career paths. Subsequently, an older man, Ira, tries to show them the rewards of resolving relationship barriers.</p>
                            </Card.Body>
                        </Card>

                        <Card className='cont' style={{ width: '22rem' }}>
                            <div className='image-box'>
                                <Card.Img variant="top" src="https://w0.peakpx.com/wallpaper/433/102/HD-wallpaper-evil-dead-rise-movie-2023.jpg" />
                            </div>
                            <Card.Body>
                                <Card.Title>Evil Dead Rise</Card.Title>
                                <p>A twisted tale of two estranged sisters whose reunion is cut short by the rise of flesh-possessing demons, thrusting them into a primal battle for survival as they face the most nightmarish version of family imaginable.</p>
                            </Card.Body>
                        </Card>

                        <Card className='cont' style={{ width: '22rem' }}>
                            <div className='image-box'>
                                <Card.Img variant="top" src="https://c4.wallpaperflare.com/wallpaper/746/84/41/puss-in-boots-dreamworks-animation-movies-wallpaper-preview.jpg" />
                            </div>
                            <Card.Body>
                                <Card.Title>Puss in Boots: The Last Wish</Card.Title>
                                <p>When Puss in Boots discovers that his passion for adventure has taken its toll and he has burned through eight of his nine lives, he launches an epic journey to restore them by finding the mythical Last Wish.</p>
                            </Card.Body>
                        </Card>

                        <Card className='cont' style={{ width: '22rem' }}>
                            <div className='image-box'>
                                <Card.Img variant="top" src="https://c4.wallpaperflare.com/wallpaper/635/746/368/avatar-neytiri-na-vi-neytiri-wallpaper-thumb.jpg" />
                            </div>
                            <Card.Body>
                                <Card.Title>Avatar: The Way of Water</Card.Title>
                                <p>Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.</p>
                            </Card.Body>
                        </Card>

                        <Card className='cont' style={{ width: '22rem' }}>
                            <div className='image-box'>
                                <Card.Img variant="top" src="https://c4.wallpaperflare.com/wallpaper/277/989/81/movie-dear-john-wallpaper-preview.jpg" />
                            </div>
                            <Card.Body>
                                <Card.Title>Dear John</Card.Title>
                                <p>John is a soldier who loves Savannah, a college student. He re-enlists post the 9/11 attack but the two continue to be in touch over letters. Fate tests their love many times over the next few years.</p>
                            </Card.Body>
                        </Card>

                        <Card className='cont' style={{ width: '22rem' }}>
                            <div className='image-box'>
                                <Card.Img variant="top" src="https://w0.peakpx.com/wallpaper/370/955/HD-wallpaper-m3gan-2023.jpg" />
                            </div>
                            <Card.Body>
                                <Card.Title>M3GAN</Card.Title>
                                <p>Designed by Gemma, a brilliant roboticist, M3GAN can listen, watch and learn as it plays the role of friend and teacher, playmate and protector. When Gemma becomes the unexpected caretaker of her 8-year-old niece, she decides to give the girl an M3GAN prototype, a decision that leads to unimaginable consequences.</p>
                            </Card.Body>
                        </Card>
                    </div>
                </div >
            </div>
            <Footer />
        </>
    )
}
export default DetailPage