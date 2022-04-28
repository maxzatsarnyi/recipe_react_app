import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

type Recipe = {
  id: number;
  title: string;
  image: string;
};

type GetSearchedResponse = {
  results: Recipe[];
};

const Searched = () => {
  const [searched, setSearched] = useState<Recipe[]>([]);
  const { search } = useParams();

  const getSearched = async (name: string | undefined) => {
    try {
      const { data } = await axios.get<GetSearchedResponse>(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_RECIPE_KEY}&query=${name}`
      );
      setSearched(data?.results);
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
    getSearched(search);
  }, [search]);

  return (
    <Grid>
      {searched.map((item) => (
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

const Grid = styled.div`
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

export default Searched;
