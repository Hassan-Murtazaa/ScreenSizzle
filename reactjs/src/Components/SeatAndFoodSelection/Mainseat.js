import './Mainseat.css';
import { useState } from 'react';
import SeatsMap from './SeatsMap';
import Food from './Food.js';

function Mainseat(props) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [nameMovie, set_nameMovie] = useState(null);

  const handleSeatClick = (seatNumber, isReserved) => {
    if (isReserved) {
      setSelectedSeats([...selectedSeats, seatNumber]);
      setTotalPrice(totalPrice + 650);
      set_nameMovie(props.arr)
    }
    else {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
      setTotalPrice(totalPrice - 650);
      set_nameMovie(null)
    }
  };

  return (
    <div className='MainDivOfSeat'>
      <div className='container'>
        <div className="screen"></div>
      </div>
      <SeatsMap rowsCount={5} seatsCount={9} onSeatClick={handleSeatClick} /><br />
      <div className='Seatpice'>
        <h3>Price per seat: $650</h3>
      </div>
      <Food price={totalPrice} seats={selectedSeats} cat={props.movieCat} movieName={props.arr} name={nameMovie} />
    </div>
  );
}

export default Mainseat;