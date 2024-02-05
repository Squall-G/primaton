import styled from "styled-components";
import { breakpoints } from "../utils/breakpoints";
import Search from "@/views/search";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { fetchLocation } from "@/utils/service";
import { addHistory } from "@/redux/historySlice";
import { Error as ErrorInterface, GetCurrent } from "../models/getCurrent";
import { background } from "@/utils/colors";
import CurrentWeather from "@/views/currentWeather";
import DetailsWeather from "@/views/detailsWeather";
import CardsList from "@/views/cardsList";
import { addFavourite, removeFavourite } from "@/redux/favouritesSlice";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  background: ${background};
  padding: 80px 240px;

  @media (max-width: ${breakpoints.xl}px) {
    padding: 40px 120px;
  }

  @media (max-width: ${breakpoints.md}px) {
    padding: 40px 20px;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;

  @media (max-width: ${breakpoints.sm}px) {
    flex-direction: column;
  }
`;

const Homepage = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.history);
  const favourites = useAppSelector((state) => state.favourites);
  const [current, setCurrent] = useState<GetCurrent | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorInterface | null>(null);

  const handleFetchLocation = async (location: string) => {
    setError(null);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setLoading(true);
    const data = await fetchLocation(location);
    try {
      if (data.success === false && data.error) {
        setError(data.error);
      } else {
        dispatch(addHistory(data));
      }
    } catch (e) {
      setError({ code: 1, type: "Error", info: "Unexpected Error" });
    }

    setLoading(false);
  };

  const handleFavourite = (value: boolean) => {
    dispatch(value ? addFavourite(current) : removeFavourite(current));
  };

  useEffect(() => {
    setCurrent(history[0]);
  }, [history]);

  return (
    <Content>
      <Search
        loading={loading}
        handleFetchLocation={handleFetchLocation}
        logo
        error={error}
      />
      <Row>
        <CurrentWeather
          favourite={
            !!favourites.find(
              (el) => el.location?.name === current?.location?.name
            )
          }
          handleFavourite={handleFavourite}
          current={current?.current}
          location={current?.location}
        />
        <DetailsWeather current={current?.current} />
      </Row>
      <CardsList
        handleFetchLocation={handleFetchLocation}
        label="Favourites"
        data={favourites}
      />
      <CardsList
        handleFetchLocation={handleFetchLocation}
        label="History"
        data={history}
      />
    </Content>
  );
};
export default Homepage;
