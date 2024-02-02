import Screen from './Mainseat.js';
import React from "react";
import './Movies.css';
import Card from 'react-bootstrap/Card';
import { BsStopwatch } from "react-icons/bs";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useEffect } from 'react';
import Navbar from '../Nav/Navbar';

function BasicExample(props) {

    useEffect(() => {
        document.body.style.backgroundColor = '#0b0c0f';

        return () => {
            document.body.style.backgroundColor = null;
        };
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0); // scroll to top of page
    }, []);

    let imgggg;

    if (props.array.name === 'Jumanji: The Next Level') {
        imgggg = props.Jumanji2
    }

    else if (props.array.name === 'Avengers: Infinity War') {
        imgggg = props.Avengers2
    }

    else if (props.array.name === 'Avatar: The Way of Water') {
        imgggg = props.Avatar2
    }

    else if (props.array.name === 'Jungle Cruise') {
        imgggg = props.Jungle2
    }

    else if (props.array.name === 'Doctor Strange in the Multiverse of Madness') {
        imgggg = props.Doctor2
    }

    else if (props.array.name === 'Zack Snyder`s Justice League') {
        imgggg = props.Justice2
    }

    else if (props.array.name === 'Deadpool 2') {
        imgggg = props.Dead2
    }

    else if (props.array.name === 'John Wick: Chapter 4') {
        imgggg = props.John2
    }

    else if (props.array.name === 'Black Adam') {
        imgggg = props.Adam2
    }

    else if (props.array.name === 'Puss in Boots: The Last Wish') {
        imgggg = props.Puss2
    }

    else if (props.array.name === 'Johnny English Strikes Again') {
        imgggg = props.English2
    }

    else if (props.array.name === 'Toy Story 4') {
        imgggg = props.Toy2
    }

    else if (props.array.name === 'Bruce Almighty') {
        imgggg = props.Bruce2
    }

    else if (props.array.name === 'The Mask') {
        imgggg = props.Mask2
    }

    else if (props.array.name === 'The Bad Guys') {
        imgggg = props.Bad2
    }

    else if (props.array.name === 'Tom and Jerry') {
        imgggg = props.Jerry2
    }

    else if (props.array.name === 'Everything Everywhere All at Once') {
        imgggg = props.Everything2
    }

    else if (props.array.name === 'Once Upon a Time... in Hollywood') {
        imgggg = props.Hollywood2
    }

    else if (props.array.name === 'Five Feet Apart') {
        imgggg = props.Five2
    }

    else if (props.array.name === 'Dear John') {
        imgggg = props.JohnR2
    }

    else if (props.array.name === 'Last Christmas') {
        imgggg = props.Last2
    }

    else if (props.array.name === 'The Proposal') {
        imgggg = props.Proposal2
    }

    else if (props.array.name === '50 First Dates') {
        imgggg = props.Dates2
    }

    else if (props.array.name === 'The Last Letter from Your Lover') {
        imgggg = props.Letter2
    }

    else if (props.array.name === 'The Longest Ride') {
        imgggg = props.Ride2
    }

    else if (props.array.name === 'Midnight Sun') {
        imgggg = props.Sun2
    }

    else if (props.array.name === 'A Star is Born') {
        imgggg = props.Star2
    }

    else if (props.array.name === 'Scream VI') {
        imgggg = props.Scream2
    }

    else if (props.array.name === 'Hereditary') {
        imgggg = props.Hereditary2
    }

    else if (props.array.name === 'Renfield') {
        imgggg = props.Renfield2
    }

    else if (props.array.name === 'Knock at the Cabin') {
        imgggg = props.Knock2
    }

    else if (props.array.name === 'M3GAN') {
        imgggg = props.M3GAN2
    }

    else if (props.array.name === 'Terrifier 2') {
        imgggg = props.Terrifier2
    }

    else if (props.array.name === 'The Forever Purge') {
        imgggg = props.Purge2
    }

    else if (props.array.name === 'The New Mutants') {
        imgggg = props.Mutant2
    }

    else if (props.array.name === 'Evil Dead Rise') {
        imgggg = props.Evil2
    }

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];

    return (
        <>
            <Navbar />
            <div className='seatSelection'>
                <div className="slide" data-ride="carousel">
                    <div className='overlay'>
                        <img className="d-block w-100 header" src={imgggg} alt="Loading..." />
                    </div>
                    <div className='DivOfInnerSmallCard mb-5'>
                        <Card className='cont'>
                            <div className='image-box'>
                                <Card.Img variant="top" src={props.array.card_picture} />
                            </div>
                        </Card>
                    </div>

                    <div className='InnerCardDescription mb-5'>
                        <h1 style={{ color: 'white', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}>{props.array.name}</h1>
                        <small style={{ color: 'white', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}>Category: {props.category}</small><br /><br />
                        <span className='imdb'>IMDB</span><span style={{ color: 'white', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}> {props.array.IMDB}/10</span><br />
                        <BsStopwatch style={{ color: 'white' }} /><span style={{ color: 'white', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}> 2h 10min</span>
                    </div>

                    <div className='HeaderSelection hand'>
                        <span className='h1'>SELECT</span>
                    </div>

                    <div className='Selection'>
                        <div className='Date'>
                            <h1>
                                <span> D </span>
                                <span> A </span>
                                <span> T </span>
                                <span> E </span>
                            </h1>
                            <ButtonGroup className='buttonGroup' variant="" size="large">
                                <Button sx={{ backgroundColor: '#1CE783', fontFamily: 'Kenyan Coffee Font', color: 'black', fontWeight: 'bolder', "&:hover": { backgroundColor: '#30b171' } }} className='buttons'>
                                    <p>{date[23]}</p> <h5>{month[3]}</h5><small>2023</small><div className="hands"></div>
                                </Button>
                                <Button sx={{ ml: 5, backgroundColor: '#1CE783', fontFamily: 'Kenyan Coffee Font', color: 'black', fontWeight: 'bolder', "&:hover": { backgroundColor: '#30b171' } }} className='buttons'>
                                    <p>{date[24]}</p> <h5>{month[3]}</h5><small>2023</small><div className="hands"></div>
                                </Button>
                                <Button sx={{ ml: 5, backgroundColor: '#1CE783', fontFamily: 'Kenyan Coffee Font', color: 'black', fontWeight: 'bolder', "&:hover": { backgroundColor: '#30b171' } }} className='buttons'>
                                    <p>{date[25]}</p> <h5>{month[3]}</h5><small>2023</small><div className="hands"></div>
                                </Button>
                            </ButtonGroup>
                            <br />
                            <ButtonGroup className='buttonGroup' variant="" size="large" >
                                <Button sx={{ backgroundColor: '#1CE783', fontFamily: 'Kenyan Coffee Font', color: 'black', fontWeight: 'bolder', "&:hover": { backgroundColor: '#30b171' } }} className='buttons'>
                                    <p>{date[26]}</p> <h5>{month[3]}</h5><small>2023</small><div className="hands"></div>
                                </Button>
                                <Button sx={{ ml: 5, backgroundColor: '#1CE783', fontFamily: 'Kenyan Coffee Font', color: 'black', fontWeight: 'bolder', "&:hover": { backgroundColor: '#30b171' } }} className='buttons'><p>
                                    {date[27]}</p> <h5>{month[3]}</h5><small>2023</small><div className="hands"></div>
                                </Button>
                                <Button sx={{ ml: 5, backgroundColor: '#1CE783', fontFamily: 'Kenyan Coffee Font', color: 'black', fontWeight: 'bolder', "&:hover": { backgroundColor: '#30b171' } }} className='buttons'>
                                    <p>{date[28]}</p> <h5>{month[3]}</h5><small>2023</small><div className="hands"></div>
                                </Button>
                            </ButtonGroup>
                        </div>

                        <div className='Time'>
                            <h1>
                                <span> T </span>
                                <span> I </span>
                                <span> M </span>
                                <span> E </span>
                            </h1>
                            <ButtonGroup className='buttonGroup2' variant="" size="large" >
                                <Button sx={{ backgroundColor: '#1CE783', fontFamily: 'Kenyan Coffee Font', color: 'black', fontWeight: 'bolder', "&:hover": { backgroundColor: '#30b171' } }} className='buttons2'>
                                    <h5>09:00</h5><small>PM</small><div className="hands2"></div>
                                </Button>
                                <Button sx={{ ml: 5, backgroundColor: '#1CE783', fontFamily: 'Kenyan Coffee Font', color: 'black', fontWeight: 'bolder', "&:hover": { backgroundColor: '#30b171' } }} className='buttons2'>
                                    <h5>10:00</h5><small>PM</small><div className="hands2"></div>
                                </Button>
                                <Button sx={{ ml: 5, backgroundColor: '#1CE783', fontFamily: 'Kenyan Coffee Font', color: 'black', fontWeight: 'bolder', "&:hover": { backgroundColor: '#30b171' } }} className='buttons2'>
                                    <h5>11:00</h5><small>PM</small><div className="hands2"></div>
                                </Button>
                            </ButtonGroup>
                            <br />
                            <ButtonGroup className='buttonGroup2' variant="" size="large" >
                                <Button sx={{ backgroundColor: '#1CE783', fontFamily: 'Kenyan Coffee Font', color: 'black', fontWeight: 'bolder', "&:hover": { backgroundColor: '#30b171' } }} className='buttons2'>
                                    <h5>01:00</h5><small>AM</small><div className="hands2"></div>
                                </Button>
                                <Button sx={{ ml: 5, backgroundColor: '#1CE783', fontFamily: 'Kenyan Coffee Font', color: 'black', fontWeight: 'bolder', "&:hover": { backgroundColor: '#30b171' } }} className='buttons2'>
                                    <h5>02:00</h5><small>AM</small><div className="hands2"></div>
                                </Button>
                                <Button sx={{ ml: 5, backgroundColor: '#1CE783', fontFamily: 'Kenyan Coffee Font', color: 'black', fontWeight: 'bolder', "&:hover": { backgroundColor: '#30b171' } }} className='buttons2'>
                                    <h5>03:00</h5><small>AM</small><div className="hands2"></div>
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
                <Screen movieCat={props.cat} arr={props.array.name} />
            </div >
        </>
    );
}

export default BasicExample;