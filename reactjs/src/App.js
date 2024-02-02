import Header from './Components/Categorization/Header';
import Categories from './Components/Categorization/Categories';
import MovieClasses from './Components/MoviesList/MovieClasses';
import MovieSlider from './Components/MoviesList/MovieSlider';
import DetailPage from './Components/BookTicket/DetailPage';
import Movies from './Components/SeatAndFoodSelection/Movies';
import Payment from './Components/Payment/Payment';
import Login from './Components/Login/Login';
import Homepage from './Components/HomePage/Homepage';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

import A1 from './Components/MoviesList/A1.jpg';
import A2 from './Components/MoviesList/A2.jpg';
import A3 from './Components/MoviesList/A3.jpg';
import C1 from './Components/MoviesList/C1.jpg';
import C2 from './Components/MoviesList/C2.jpg';
import C3 from './Components/MoviesList/C3.jpg';
import H1 from './Components/MoviesList/H1.jpg';
import H2 from './Components/MoviesList/H2.jpg';
import H3 from './Components/MoviesList/H3.jpg';
import R1 from './Components/MoviesList/R1.jpg';
import R2 from './Components/MoviesList/R2.jpg';
import R3 from './Components/MoviesList/R3.jpg';

import Adam1 from './Components/ActionFullScreen/Adam1.jpg';
import Adam2 from './Components/ActionFullScreen/Adam2.jpg';
import Avatar1 from './Components/ActionFullScreen/Avatar1.jpg';
import Avatar2 from './Components/ActionFullScreen/Avatar2.jpg';
import Avengers1 from './Components/ActionFullScreen/Avengers1.jpg';
import Avengers2 from './Components/ActionFullScreen/Avengers2.jpg';
import Dead1 from './Components/ActionFullScreen/Dead1.jpg';
import Dead2 from './Components/ActionFullScreen/Dead2.jpg';
import Doctor1 from './Components/ActionFullScreen/Doctor1.jpg';
import Doctor2 from './Components/ActionFullScreen/Doctor2.jpg';
import John1 from './Components/ActionFullScreen/John1.jpg';
import John2 from './Components/ActionFullScreen/John2.jpg';
import Jumanji1 from './Components/ActionFullScreen/Jumanji1.jpg';
import Jumanji2 from './Components/ActionFullScreen/Jumanji2.jpg';
import Jungle1 from './Components/ActionFullScreen/Jungle1.jpg';
import Jungle2 from './Components/ActionFullScreen/Jungle2.jpg';
import Justice1 from './Components/ActionFullScreen/Justice1.jpg';
import Justice2 from './Components/ActionFullScreen/Justice2.jpg';

import Bad1 from './Components/ComedyFullScreen/Bad1.jpg';
import Bad2 from './Components/ComedyFullScreen/Bad2.jpg';
import Bruce1 from './Components/ComedyFullScreen/Bruce1.jpg';
import Bruce2 from './Components/ComedyFullScreen/Bruce2.jpg';
import English1 from './Components/ComedyFullScreen/English1.jpg';
import English2 from './Components/ComedyFullScreen/English2.jpg';
import Everything1 from './Components/ComedyFullScreen/Everything1.jpg';
import Everything2 from './Components/ComedyFullScreen/Everything2.jpg';
import Hollywood1 from './Components/ComedyFullScreen/Hollywood1.jpg';
import Hollywood2 from './Components/ComedyFullScreen/Hollywood2.jpg';
import Jerry1 from './Components/ComedyFullScreen/Jerry1.jpg';
import Jerry2 from './Components/ComedyFullScreen/Jerry2.jpg';
import Mask1 from './Components/ComedyFullScreen/Mask1.jpg';
import Mask2 from './Components/ComedyFullScreen/Mask2.jpg';
import Puss1 from './Components/ComedyFullScreen/Puss1.jpg';
import Puss2 from './Components/ComedyFullScreen/Puss2.jpg';
import Toy1 from './Components/ComedyFullScreen/Toy1.jpg';
import Toy2 from './Components/ComedyFullScreen/Toy2.jpg';

import Dates1 from './Components/RomanceFullScreen/Dates1.jpg';
import Dates2 from './Components/RomanceFullScreen/Dates2.jpg';
import Five1 from './Components/RomanceFullScreen/Five1.jpg';
import Five2 from './Components/RomanceFullScreen/Five2.jpg';
import JohnR1 from './Components/RomanceFullScreen/John1.jpg';
import JohnR2 from './Components/RomanceFullScreen/John2.jpg';
import Last1 from './Components/RomanceFullScreen/Last1.jpg';
import Last2 from './Components/RomanceFullScreen/Last2.jpg';
import Letter1 from './Components/RomanceFullScreen/Letter1.jpg';
import Letter2 from './Components/RomanceFullScreen/Letter2.jpg';
import Proposal1 from './Components/RomanceFullScreen/Proposal1.jpg';
import Proposal2 from './Components/RomanceFullScreen/Proposal2.jpg';
import Ride1 from './Components/RomanceFullScreen/Ride1.jpg';
import Ride2 from './Components/RomanceFullScreen/Ride2.jpg';
import Star1 from './Components/RomanceFullScreen/Star1.jpg';
import Star2 from './Components/RomanceFullScreen/Star2.jpg';
import Sun1 from './Components/RomanceFullScreen/Sun1.jpg';
import Sun2 from './Components/RomanceFullScreen/Sun2.jpg';

import Evil1 from './Components/HorrorFullScreen/Evil1.jpg';
import Evil2 from './Components/HorrorFullScreen/Evil2.png';
import Hereditary1 from './Components/HorrorFullScreen/Hereditary1.jpg';
import Hereditary2 from './Components/HorrorFullScreen/Hereditary2.jpg';
import Knock1 from './Components/HorrorFullScreen/Knock1.jpg';
import Knock2 from './Components/HorrorFullScreen/Knock2.jpg';
import M3GAN1 from './Components/HorrorFullScreen/M3GAN1.jpg';
import M3GAN2 from './Components/HorrorFullScreen/M3GAN2.jpg';
import Mutant1 from './Components/HorrorFullScreen/Mutant1.jpg';
import Mutant2 from './Components/HorrorFullScreen/Mutant2.jpg';
import Purge1 from './Components/HorrorFullScreen/Purge1.jpg';
import Purge2 from './Components/HorrorFullScreen/Purge2.jpg';
import Renfield1 from './Components/HorrorFullScreen/Renfield1.jpg';
import Renfield2 from './Components/HorrorFullScreen/Renfield2.jpg';
import Scream1 from './Components/HorrorFullScreen/Scream1.jpg';
import Scream2 from './Components/HorrorFullScreen/Scream2.jpg';
import Terrifier1 from './Components/HorrorFullScreen/Terrifier1.jpg';
import Terrifier2 from './Components/HorrorFullScreen/Terrifier2.jpg';

function App() {
  const [actionMovies, set_actionMovies] = useState([]);
  const [comedyMovies, set_comedyMovies] = useState([]);
  const [horrorMovies, set_horrorMovies] = useState([]);
  const [romanceMovies, set_romanceMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const action_Response = await axios.get('http://localhost:3000/get-all-actionList');
        const comedy_Response = await axios.get('http://localhost:3000/get-all-comedyList');
        const horror_Response = await axios.get('http://localhost:3000/get-all-horrorList');
        const romance_Response = await axios.get('http://localhost:3000/get-all-romanceList');

        set_actionMovies(action_Response.data);
        set_comedyMovies(comedy_Response.data);
        set_horrorMovies(horror_Response.data);
        set_romanceMovies(romance_Response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  let action = {
    image1: A1,
    image2: A2,
    image3: A3
  }

  let comedy = {
    image1: C1,
    image2: C2,
    image3: C3
  }

  let horror = {
    image1: H1,
    image2: H2,
    image3: H3
  }

  let romance = {
    image1: R1,
    image2: R2,
    image3: R3
  }

  let actionImages = {
    Adam1: Adam1,
    Adam2: Adam2,
    Avatar1: Avatar1,
    Avatar2: Avatar2,
    Avengers1: Avengers1,
    Avengers2: Avengers2,
    Dead1: Dead1,
    Dead2: Dead2,
    Doctor1: Doctor1,
    Doctor2: Doctor2,
    John1: John1,
    John2: John2,
    Jumanji1: Jumanji1,
    Jumanji2: Jumanji2,
    Jungle1: Jungle1,
    Jungle2: Jungle2,
    Justice1: Justice1,
    Justice2: Justice2,
  }

  let comedyImages = {
    Bad1: Bad1,
    Bad2: Bad2,
    Bruce1: Bruce1,
    Bruce2: Bruce2,
    English1: English1,
    English2: English2,
    Everything1: Everything1,
    Everything2: Everything2,
    Hollywood1: Hollywood1,
    Hollywood2: Hollywood2,
    Jerry1: Jerry1,
    Jerry2: Jerry2,
    Mask1: Mask1,
    Mask2: Mask2,
    Puss1: Puss1,
    Puss2: Puss2,
    Toy1: Toy1,
    Toy2: Toy2,
  }

  let horrorImages = {
    Evil1: Evil1,
    Evil2: Evil2,
    Hereditary1: Hereditary1,
    Hereditary2: Hereditary2,
    Knock1: Knock1,
    Knock2: Knock2,
    M3GAN1: M3GAN1,
    M3GAN2: M3GAN2,
    Mutant1: Mutant1,
    Mutant2: Mutant2,
    Purge1: Purge1,
    Purge2: Purge2,
    Renfield1: Renfield1,
    Renfield2: Renfield2,
    Scream1: Scream1,
    Scream2: Scream2,
    Terrifier1: Terrifier1,
    Terrifier2: Terrifier2,
  }

  let romanceImages = {
    Dates1: Dates1,
    Dates2: Dates2,
    Five1: Five1,
    Five2: Five2,
    JohnR1: JohnR1,
    JohnR2: JohnR2,
    Last1: Last1,
    Last2: Last2,
    Letter1: Letter1,
    Letter2: Letter2,
    Proposal1: Proposal1,
    Proposal2: Proposal2,
    Ride1: Ride1,
    Ride2: Ride2,
    Star1: Star1,
    Star2: Star2,
    Sun1: Sun1,
    Sun2: Sun2,
  }

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route exact path='home' element={<Homepage />} />
            <Route exact path='movies' element={<Header />} >
              <Route index element={<Categories />} />
            </Route>
            <Route exact path="movies/action" element={[<MovieSlider {...action} />, <MovieClasses array={actionMovies} text='action' />]} />
            {actionMovies.length > 0 &&
              <>
                {actionMovies.map((ActionMovie) =>
                  <>
                    <Route exact path={`/movies/action/${ActionMovie.name}`} element={<DetailPage {...actionImages} array={ActionMovie} category='Action' cat='action' />} />
                    <Route exact path={`/movies/action/${ActionMovie.name}/Book Ticket`} element={<Movies {...actionImages} array={ActionMovie} category='Action' cat='action' />} />
                    <Route exact path={`/movies/action/${ActionMovie.name}/Book Ticket/Payment`} element={<Payment array={ActionMovie} />} />
                  </>
                )}
              </>
            }
            <Route exact path="movies/comedy" element={[<MovieSlider {...comedy} />, <MovieClasses array={comedyMovies} text='comedy' />]} />
            {comedyMovies.length > 0 &&
              <>
                {comedyMovies.map((ComedyMovie) =>
                  <>
                    <Route exact path={`/movies/comedy/${ComedyMovie.name}`} element={<DetailPage {...comedyImages} array={ComedyMovie} category='Comedy' cat='comedy' />} />
                    <Route exact path={`/movies/comedy/${ComedyMovie.name}/Book Ticket`} element={<Movies {...comedyImages} array={ComedyMovie} category='Comedy' cat='comedy' />} />
                    <Route exact path={`/movies/comedy/${ComedyMovie.name}/Book Ticket/Payment`} element={<Payment array={ComedyMovie} />} />
                  </>
                )}
              </>
            }
            <Route exact path="movies/horror" element={[<MovieSlider {...horror} />, <MovieClasses array={horrorMovies} text='horror' />]} />
            {horrorMovies.length > 0 &&
              <>
                {horrorMovies.map((HorrorMovie) =>
                  <>
                    <Route exact path={`/movies/horror/${HorrorMovie.name}`} element={<DetailPage {...horrorImages} array={HorrorMovie} category='Horror' cat='horror' />} />
                    <Route exact path={`/movies/horror/${HorrorMovie.name}/Book Ticket`} element={<Movies {...horrorImages} array={HorrorMovie} category='Horror' cat='horror' />} />
                    <Route exact path={`/movies/horror/${HorrorMovie.name}/Book Ticket/Payment`} element={<Payment array={HorrorMovie} />} />
                  </>
                )}
              </>
            }
            <Route exact path="movies/romance" element={[<MovieSlider {...romance} />, <MovieClasses array={romanceMovies} text='romance' cat='romance' />]} />
            {romanceMovies.length > 0 &&
              <>
                {romanceMovies.map((RomanceMovie) =>
                  <>
                    <Route exact path={`/movies/romance/${RomanceMovie.name}`} element={<DetailPage {...romanceImages} array={RomanceMovie} category='Romance' cat='romance' />} />
                    <Route exact path={`/movies/romance/${RomanceMovie.name}/Book Ticket`} element={<Movies {...romanceImages} array={RomanceMovie} category='Romance' cat='romance' />} />
                    <Route exact path={`/movies/romance/${RomanceMovie.name}/Book Ticket/Payment`} element={<Payment array={RomanceMovie} />} />
                  </>
                )}
              </>
            }
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;