import React, { useEffect, useRef, useState } from 'react';
import { FastAverageColor } from 'fast-average-color';
import './FoodSearch.css';

const API_KEY = 'KNTWk6uhTwFlPMhqvLMHJt8EH8dgaNdShPby2HyB';

const getComplementaryColor = (rgb) => {
  const [r, g, b] = rgb;
  return `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
};

const FoodSearch = () => {
  const [bgColor, setBgColor] = useState('#ffffff');
  const [complementaryColor, setComplementaryColor] = useState('#000000');
  const [foodData, setFoodData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const imageRef = useRef(null);

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data.foods);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSelectFood = async (fdcId) => {
    try {
      const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${API_KEY}`);
      const data = await response.json();
      setFoodData(data);
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  useEffect(() => {
    if (foodData && imageRef.current && imageRef.current.complete) {
      setColors();
    } else if (foodData) {
      imageRef.current.onload = setColors;
    }
  }, [foodData]);

  const setColors = () => {
    const fac = new FastAverageColor();
    fac.getColorAsync(imageRef.current)
      .then(color => {
        setBgColor(color.rgb);
        setComplementaryColor(getComplementaryColor(color.value));
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="food-search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((food) => (
            <div key={food.fdcId} className="search-result-item" onClick={() => handleSelectFood(food.fdcId)}>
              {food.description}
            </div>
          ))}
        </div>
      )}
      {foodData && (
        <div className="food-card" style={{ backgroundColor: bgColor }}>
          <div className="card-header">
            <h5 className="card-title" style={{ color: complementaryColor }}>
              {foodData.description}
            </h5>
          </div>
          <img ref={imageRef} src="/images/placeholder.png" className="food-image" alt={foodData.description} />
          <div className="card-content" style={{ backgroundColor: complementaryColor }}>
            <h5 className="food-title">{foodData.description}</h5>
            {foodData.foodNutrients && foodData.foodNutrients.length > 0 ? (
              foodData.foodNutrients.map((nutrient) => (
                <p key={nutrient.nutrientId} className="food-description">
                  {nutrient.nutrientName}: {nutrient.value} {nutrient.unitName}
                </p>
              ))
            ) : (
              <p className="food-description">Nutrient information is not available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodSearch;
