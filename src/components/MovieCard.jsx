import { FaStar } from 'react-icons/fa'


const MovieCard = ({image, title, date, rating}) => {
  const releaseYear = new Date(date).getFullYear();
  //console.log(releaseYear);
  const roundUp = typeof rating === "number" ? parseFloat(rating.toFixed(1)) : "N/A";

  

  return (
    <div className='single-card'>
      <img
      src={image}
      alt={title}
      
       
      />
      <h6>{title}</h6>
      <div className='movie-card-year'>
      <p>{releaseYear}</p>
      <p><FaStar style={{ color: 'gold', marginRight: '5px' }}/>{roundUp}</p>
      </div>
    </div>
  )
}

export default MovieCard
