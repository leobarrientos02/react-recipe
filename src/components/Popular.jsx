import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

const Popular = () => {
  
  const [popular, setPopular] = useState([]);
  
  const getPopular = async () => {

    const check = localStorage.getItem('popular');

    if(check){
      setPopular(JSON.parse(check));
    } else{
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=12`)
      const data = await api.json();
     
      localStorage.setItem('popular', JSON.stringify(data.recipes));
      //console.log(data);
      setPopular(data.recipes);
    }
  }

  useEffect(()=> {
    getPopular();
  },[]);

  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>
        <Splide
          options={{ 
            perPage: 4,
            drag: 'free',
            gap: '5rem',
            pagination: false,
            arrows: false,
        }}
        >
          {popular.map((recipe) => {
            return(
              <SplideSlide key={recipe.id}>
                <Card>
                  <p>{recipe.title}</p>
                  <img src={recipe.image || "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"} alt={recipe.title} />
                  <Gradient />
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
    font-size: 1.2rem;
    width: 90%;
    height: 40%;
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

export default Popular;