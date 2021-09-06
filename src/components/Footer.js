import styled from 'styled-components';

const FooterBox = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  font-weight: 700;
  color: #111;
  background-color: #ff0558;
`;

const Footer = () => {
  return <FooterBox>Apollo 2021 with nomadcoders.co</FooterBox>;
};

export default Footer;
