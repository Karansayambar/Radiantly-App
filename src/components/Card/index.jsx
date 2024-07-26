import "./style.css";
const Card = ({ data }) => {
    return (
        <div className='cart-container'>
            {data.map((pokemon, index) => (
                <div key={index} className='card'>
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.image} alt={pokemon.name} />
                </div>
            ))}
        </div>
    )
}

export default Card;
