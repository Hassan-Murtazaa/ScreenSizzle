import Seat from './Seat';

const SeatsRow = ({ seatsCount, rowNumber, onSeatClick }) => {
  const seats = Array(seatsCount)
    .fill()
    .map((_, index) => (
      <Seat key={`seat-${rowNumber}-${index}`} seatNumber={`${rowNumber}${index + 1}`} onSeatClick={onSeatClick} seatType="standard" />
    ));

  return (
    <div className='OuterDivOfSeat'>
      <div className='RowNumbering'>
        {rowNumber}
      </div>
      {seats}
    </div>
  );
};

export default SeatsRow;