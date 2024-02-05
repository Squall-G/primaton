import styled from "styled-components";
import { background } from "../utils/colors";
import { useState } from "react";
import logo from "/logo.svg";
import { fetchLocation } from "../utils/service";
import { addHistory } from "../redux/historySlice";
import { useAppDispatch } from "../redux/store";
import { Error as ErrorInterface } from "../models/getCurrent";
import { breakpoints } from "@/utils/breakpoints";
import Search from "@/views/search";

const Container = styled.div`
  width: 100dvw;
  height: 100dvh;
  background: ${background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;

  @media (max-width: ${breakpoints.xl}px) {
    padding: 0px 120px;
  }

  @media (max-width: ${breakpoints.md}px) {
    padding: 0px 20px;
  }
`;

const Landing = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorInterface | null>(null);

  const handleFetchLocation = async (location: string) => {
    setError(null);
    setLoading(true);
    const data = await fetchLocation(location);
    if (data.success === false && data.error) {
      setError(data.error);
    } else {
      dispatch(addHistory(data));
    }

    setLoading(false);
  };

  return (
    <Container>
      <img src={logo} />
      <Search
        loading={loading}
        handleFetchLocation={handleFetchLocation}
        error={error}
        center
      />
    </Container>
  );
};
export default Landing;
