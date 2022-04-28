import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

type Detail = {
  id: number;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  extendedIngredients: { id: number; original: string }[];
};

const Recipe = () => {
  const [details, setDetails] = useState<Detail>({
    id: 0,
    title: '',
    image: '',
    summary: '',
    instructions: '',
    extendedIngredients: [],
  });
  const [activeTab, setActiveTab] = useState<string>('instructions');
  const { name } = useParams();

  const getDetails = async () => {
    try {
      const { data } = await axios.get<Detail>(
        `https://api.spoonacular.com/recipes/${name}/information?apiKey=${process.env.REACT_APP_RECIPE_KEY}`
      );
      setDetails(data);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occured';
      }
    }
  };

  useEffect(() => {
    getDetails();
  }, [name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details?.title}</h2>
        <img src={details?.image} alt={details?.title} />
      </div>
      <Info>
        <Button
          className={activeTab === 'instructions' ? 'active' : ''}
          onClick={() => setActiveTab('instructions')}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === 'ingredients' ? 'active' : ''}
          onClick={() => setActiveTab('ingredients')}
        >
          Ingredients
        </Button>
        {activeTab === 'instructions' && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {activeTab === 'ingredients' && (
          <ul>
            {details.extendedIngredients.map((ing) => (
              <li key={ing.id}>{ing.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
  }
  h2 {
    margin-bottom: 2rem;
  }
  h3 {
    margin-top: 1rem;
    color: #000;
    font-weight: 500;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: #fff;
  border-color: 2px solid #000;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;
`;

const Info = styled.div`
  margin-left: 10rem;
`;

export default Recipe;
