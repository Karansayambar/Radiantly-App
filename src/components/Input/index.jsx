import { useState, useEffect } from 'react';
import "./style.css";

const Input = ({ value, onSearch }) => {
    const [inputValue, setInputValue] = useState(value);

    const handleChange = (e) => {
        setInputValue(e.target.value);
        onSearch(e.target.value);
    }

    useEffect(() => {
        console.log("value", inputValue);
    }, [inputValue])

    return (
        <div className='input-container'>
            <input 
                type='text' 
                value={inputValue} 
                onChange={handleChange} 
                placeholder="Search Pokémon"
            />
        </div>
    )
}

export default Input;
