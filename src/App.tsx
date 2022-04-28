import { Suspense } from 'react';
import { Category } from './components/Category';
import { Search } from './components/Search';
import { Routes } from './routes/index';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GiKnifeFork } from 'react-icons/gi';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <Nav>
          <GiKnifeFork />
          <Logo to={`/`}>delicious</Logo>
        </Nav>
        <Search />
        <Category />
        <Routes />
      </Container>
    </Suspense>
  );
}

const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 50px 20px;
`;

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
`;

const Nav = styled.div`
  /* padding: 4rem 0rem; */
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg {
    font-size: 2rem;
  }
`;

export default App;
