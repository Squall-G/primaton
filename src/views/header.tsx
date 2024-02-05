import styled from "styled-components";
import logo from "/logo.svg";
import { breakpoints } from "../utils/breakpoints";
import { background, white } from "../utils/colors";

const Container = styled.header`
  background: ${background};
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0px 15%;
  align-items: center;
  z-index: 5;
  position: sticky;
  top: 0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  @media (max-width: ${breakpoints.xl}px) {
    padding: 0px 120px;
  }

  @media (max-width: ${breakpoints.md}px) {
    padding: 0px 20px;
  }
`;

const Header = () => (
  <Container>
    <span className="title_medium" style={{ color: white }}>
      My Weather App
    </span>
    <img src={logo} width={"60px"} height={"40px"} />
  </Container>
);
export default Header;
