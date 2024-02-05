import { Card } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Current, Location } from "@/models/getCurrent";
import { breakpoints } from "@/utils/breakpoints";
import { background, primary, white } from "@/utils/colors";
import { handleUnitOfMeasure } from "@/utils/functions";
import { MapPin, Star } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import styled from "styled-components";

const CustomCard = styled(Card)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px;
  gap: 16px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${breakpoints.xs}px) {
    gap: 16px;
    flex-direction: column;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Head = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;

  @media (max-width: ${breakpoints.xs}px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const PlaceDiv = styled.div`
  display: flex;
  border: 1px solid ${primary};
  background: ${white};
  border-radius: 24px;
  gap: 16px;
  padding: 16px;
  width: fit-content;
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CurrentWeather: React.FC<{
  location: Location | undefined;
  current: Current | undefined;
  favourite: boolean;
  handleFavourite: (value: boolean) => void;
}> = ({ location, current, favourite, handleFavourite }) => {
  const [toggleValue, setToggleValue] = useState<"C" | "F">("C");

  return (
    <CustomCard>
      <Top>
        <Head>
          <PlaceDiv>
            <MapPin color={background} className="mr-2 h-4 w-4" />
            <span style={{ color: background }} className="title_medium">
              {location?.name}
            </span>
          </PlaceDiv>
          <Star
            cursor="pointer"
            className="mr-2 h-4 w-4"
            fill={favourite ? primary : "none"}
            onClick={() => handleFavourite(!favourite)}
          />
        </Head>
        <ToggleGroup
          type="single"
          value={toggleValue}
          onValueChange={(value) => {
            if (value) setToggleValue(value as "C" | "F");
          }}
        >
          <ToggleGroupItem value="C" aria-label="Toggle C">
            <span>C</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="F" aria-label="Toggle F">
            <span>F</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </Top>
      <Bottom>
        <Infos>
          <span
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <span className="body_large">
              Weather -{" "}
              {current?.weather_descriptions.map((el) => el).join(" - ")}
            </span>
            <span className="body_small">
              {moment(location?.localtime).format("MMMM Do YYYY, h:mm a")}
            </span>
          </span>
          <span
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <span className="degrees">
              {String(handleUnitOfMeasure(current?.temperature, toggleValue))}°{" "}
              {toggleValue}
            </span>
            <span className="body_small">
              Feels like {handleUnitOfMeasure(current?.feelslike, toggleValue)}
            </span>
          </span>
        </Infos>
        <img src={current?.weather_icons[0]} />
      </Bottom>
    </CustomCard>
  );
};
export default CurrentWeather;
