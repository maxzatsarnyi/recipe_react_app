import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { GetResultsResponse, Recipe } from '../config';

const Cuisine = () => {
  const [cuisine, setCuisine] = useState<Recipe[]>([]);
  const { type } = useParams();

  const getCuisine = async (name: string | undefined) => {
    try {
      const { data } = await axios.get<GetResultsResponse<Recipe>>(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_RECIPE_KEY}&cuisine=${name}`
      );
      setCuisine(data.results);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occured';
      }
      console.log(error);
    }
  };

  useEffect(() => {
    getCuisine(type);
  }, [type]);

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisine.map((item) => (
        <Card key={item.id}>
          <Link to={`/recipe/${item.id}`}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
          </Link>
        </Card>
      ))}
    </Grid>
  );
};

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Cuisine;
