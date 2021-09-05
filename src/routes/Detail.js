import { useParams } from 'react-router';
import { gql, useQuery } from '@apollo/client';

const GET_MOVIES = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      description_intro
    }
  }
`;

const Detail = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIES, {
    variables: { id },
  });

  console.log(loading, data);

  if (loading) {
    return 'Loading...';
  }

  if (data && data.movie) {
    return data.movie.title;
  }

  return 'Detail';
};

export default Detail;
