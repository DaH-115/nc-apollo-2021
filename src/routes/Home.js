import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import Movie from '../components/Movie';
import Footer from '../components/Footer';

const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
      isLiked @client
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #111;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40vh;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 700;
  color: #ff0558;
  margin-bottom: 20px;
`;

const Subtitle = styled.h3`
  font-size: 30px;
  color: #fff;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  background-color: #111;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  width: 90%;
  margin-bottom: 120px;
`;

const Home = () => {
  const { loading, data } = useQuery(GET_MOVIES);

  return (
    <Container>
      <Header>
        <Title>Apollo 2021</Title>
        <Subtitle>My First GraphQL</Subtitle>
      </Header>
      {loading && <Loading>Loading...</Loading>}
      <Movies>
        {data?.movies?.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            isLiked={movie.isLiked}
            bg={movie.medium_cover_image}
          />
        ))}
      </Movies>
      <Footer />
    </Container>
  );
};

export default Home;
