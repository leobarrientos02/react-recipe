import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { GiMilkCarton, GiWheat, GiBroccoli } from 'react-icons/gi'
import { RiLeafFill } from 'react-icons/ri'
import { FaUserFriends } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';

const Recipe = () => {
    
    let params = useParams();

    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState('instructions');

    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
        const detailData = await data.json();
        
        setDetails(detailData);
        // console.log(detailData);
    }
    useEffect(()=>{
        fetchDetails();
    },[params.name]);
  
    return (
        <DetailWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image || "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"} alt={details.title} />
                <h5><IoMdTime /> Ready In {details.readyInMinutes} Minutes</h5>
                <h5><FaUserFriends /> {details.servings} Servings</h5>
                <h5><GiBroccoli />{details.vegan === true ? "Vegan" : "Not Vegan"}</h5>
                <h5><RiLeafFill />{details.vegetarian === true ? "Vegetarian" : "Not Vegetarian"}</h5>
                <h5><GiWheat />{details.glutenFree === true ? "Gluten-Free" : "Not Gluten-Free"}</h5>
                <h5><GiMilkCarton /> {details.dairyFree === true ? "Dairy-Free" : "Not Dairy-Free"}</h5>
            </div>
            <Info>
                <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')}>
                    Instructions
                </Button>
                <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>
                    Ingredients
                </Button>
                {activeTab === 'instructions' && (
                    <div>
                        <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
                        <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
                    </div>
                )}
                {activeTab === 'ingredients' && (
                    <ul>
                        {details.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>
                                {ingredient.original}
                            </li>
                        ))}
                    </ul>  
                )}
            </Info>
        </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h2{
        margin-bottom: 2rem;
    }
    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul{
        margin-top: 2rem;
    }
    svg{
        font-size: 2rem;
        padding-right: 0.5rem;
    }
    h5 {
        font-weight: bold;
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        padding: 0.5rem 0rem;
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
`;

const Info = styled.div`
    margin-left: 10rem;
`;

export default Recipe