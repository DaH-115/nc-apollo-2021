import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LIKE_MOVIE = gql`
  mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`;

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
      isLiked @client
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: 70vh;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 20px rgba(63, 65, 80, 0.3);
`;

const Movie = ({ id, isLiked, bg }) => {
  useQuery(GET_MOVIE, {
    variables: {
      id: parseInt(id),
      isCachedYet: true,
    },
  });
  const [toogleLikeMovie] = useMutation(LIKE_MOVIE, {
    variables: { id: parseInt(id), isLiked },
  });

  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg} />
      </Link>
      <button onClick={toogleLikeMovie}>{isLiked ? 'Unlike' : 'Like'}</button>
    </Container>
  );
};

export default Movie;
