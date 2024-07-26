import axios from 'axios';
import { useEffect, useState } from 'react';
import "./App.css";
import Input from './components/Input';
import Card from './components/Card';

const App = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    const getData = async () => {
        try {
            const url = "https://pokeapi.co/api/v2/pokemon";
            const response = await axios.get(url);
            const results = response.data.results;
            
            const detailedDataPromises = results.map(pokemon => axios.get(pokemon.url));
            const detailedDataResponses = await Promise.all(detailedDataPromises);
            const detailedData = detailedDataResponses.map(res => ({
                name: res.data.name,
                image: res.data.sprites.front_default
            }));

            setData(detailedData);
            setFilteredData(detailedData); // Initialize filteredData with all Pokémon...
        } catch (err) {
            console.error("Error fetching data:", err);
            setError(err.message);
        }
    }

    const handleSearch = (value) => {
        setSearchValue(value);
        const filtered = data.filter(pokemon => 
            pokemon.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <Input value={searchValue} onSearch={handleSearch} />
            <div className='card-container'>
                {error && <div>Error: {error}</div>}
                <Card data={filteredData} />
            </div>
        </div>
    )
}

export default App;
