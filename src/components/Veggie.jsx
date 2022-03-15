import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from 'react-router-dom';

const Veggie = () => {
  
  const [veggie, setVeggie] = useState([]);
  
  const getVeggie = async () => {

    const check = localStorage.getItem('Veggie');

    if(check){
      setVeggie(JSON.parse(check));
    } else{
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=12&tags=vegetarian`)
      const data = await api.json();
     
      localStorage.setItem('Veggie', JSON.stringify(data.recipes));
      //console.log(data);
      setVeggie(data.recipes);
    }
  }

  useEffect(()=> {
    getVeggie();
  },[]);

  return (
    <div>
      <Wrapper>
        <h3>Our Vegetarian Picks</h3>
        <Splide
          options={{ 
            perPage: 3,
            drag: 'free',
            gap: '5rem',
            arrows: false,
        }}
        >
          {veggie.map((recipe) => {
            return(
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={'/recipe/'+recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image || "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            )
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}
const Wrapper = styled.div`
  margin: 4rem 0rem;
`;
const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  img{
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p{
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    text-align: center;
    font-weight: bold;
    font-size: 1.5rem;
    height: 40%;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0.0.5));
`

export default Veggie;