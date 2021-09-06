import { useParams } from 'react-router';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import Movie from '../components/Movie';
import Footer from '../components/Footer';

const GET_MOVIES = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      medium_cover_image
      language
      rating
      description_intro
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 90vh;
  background-color: #111;
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

const Column = styled.div`
  width: 50%;
`;

const Title = styled.h1`
  color: #ff0558;
  font-size: 64px;
  font-weight: 700;
  margin-bottom: 40px;
`;

const Subtitle = styled.h4`
  color: #fff;
  font-size: 32px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: #fff;
  font-size: 24px;
  line-height: 1.3;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  width: 25%;
  height: 80%;
  background-size: cover;
  background-position: center center;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 20px rgba(63, 65, 80, 0.3);
`;

const Scontainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #111;
  padding-bottom: 120px;
`;

const SuggText = styled.h4`
  color: #ff0558;
  font-size: 32px;
  padding-left: 80px;
  padding-bottom: 30px;
  background-color: #111;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 90%;
`;

const Detail = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIES, {
    variables: { id },
  });

  console.log(data?.suggestions);

  return (
    <>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Container>
            <Column>
              <Title>{data?.movie?.title}</Title>
              <Subtitle>
                {data?.movie?.language} · {data?.movie?.rating}
              </Subtitle>
              <Description>{data?.movie?.description_intro}</Description>
            </Column>
            <Poster bg={data?.movie?.medium_cover_image}></Poster>
          </Container>
          <SuggText>Suggestions</SuggText>
          <Scontainer>
            <Movies>
              {data?.suggestions?.map((sugg) => (
                <Movie
                  key={sugg.id}
                  id={sugg.id}
                  bg={sugg.medium_cover_image}
                />
              ))}
            </Movies>
          </Scontainer>
          <Footer />
        </>
      )}
    </>
  );
};

export default Detail;
