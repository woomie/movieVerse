const MovieCard = ({image, title}) => {


  return (
    <div>
      <img
      src={image}
      alt={title}
      />
      <h5>{title}</h5>
    </div>
  )
}

export default MovieCard
