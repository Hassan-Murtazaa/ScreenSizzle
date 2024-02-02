import { useState } from 'react';

const Seat = ({ seatNumber, onSeatClick, seatType }) => {
  const [reserved, setReserved] = useState(false);

  const handleSeatClick = () => {
    setReserved(!reserved);
    onSeatClick(seatNumber, !reserved);
  };

  return (
    <div className={`seat ${seatType} ${reserved ? 'reserved' : ''}`} onClick={handleSeatClick}>
      {seatNumber}
    </div>
  );
};

export default Seat;