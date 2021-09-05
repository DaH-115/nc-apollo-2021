import { gql, useQuery } from '@apollo/client';
import Movie from '../components/Movie';

const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
    }
  }
`;

const Home = () => {
  const { loading, data } = useQuery(GET_MOVIES);
  console.log(loading, data);

  return (
    <>
      <header>
        <title>Apollo 2021</title>
        <h2>My First GraphQL</h2>
      </header>
      {loading && <p>Loading...</p>}
      {!loading &&
        data.movies &&
        data.movies.map((movie) => <Movie key={movie.id} {...movie} />)}
    </>
  );
};

export default Home;
