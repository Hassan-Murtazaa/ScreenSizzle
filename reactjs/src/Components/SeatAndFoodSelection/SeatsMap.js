import SeatsRow from './SeatsRow';

const SeatsMap = ({ rowsCount, seatsCount, onSeatClick }) => {
  const rows = Array(rowsCount)
    .fill()
    .map((_, index) => (
      <SeatsRow key={`row-${index}`} rowNumber={index + 1} seatsCount={seatsCount} onSeatClick={onSeatClick} />
    ));

  return (
    <div>
      <div>{rows}</div>
    </div>
  );
};

export default SeatsMap;