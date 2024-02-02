import React from 'react'
import './Actor.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Actors(props) {
    const [actors, set_actors] = useState([]);

    useEffect(() => {

        if (props.category === 'action') {
            const fetchData = async () => {
                try {
                    const actors_Response = await axios.get(`http://localhost:3000/get-all-actionActors/${props.n}`);
                    set_actors(actors_Response.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }

        else if (props.category === 'comedy') {
            const fetchData = async () => {
                try {
                    const actors_Response = await axios.get(`http://localhost:3000/get-all-comedyActors/${props.n}`);
                    set_actors(actors_Response.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }

        else if (props.category === 'horror') {
            const fetchData = async () => {
                try {
                    const actors_Response = await axios.get(`http://localhost:3000/get-all-horrorActors/${props.n}`);
                    set_actors(actors_Response.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }

        else if (props.category === 'romance') {
            const fetchData = async () => {
                try {
                    const actors_Response = await axios.get(`http://localhost:3000/get-all-romanceActors/${props.n}`);
                    set_actors(actors_Response.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }
    }, []);

    return (
        <div className="Main-Div-Actor-Details">
            {actors.length > 0 &&
                <>
                    {actors.map((actor) =>
                        <div className="card" >
                            <div className="imgBx">
                                <img src={actor.picture} alt="images" />
                            </div>
                            <div className="details">
                                <h2>{actor.actorName}<br /> {actor.gender === 'Male' ? (
                                    <span>Actor</span>
                                ) : (
                                    <span>Actress</span>
                                )}</h2>
                            </div>
                        </div>
                    )}
                </>
            }
        </div >
    )
}

export default Actors