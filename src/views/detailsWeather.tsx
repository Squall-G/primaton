import { Card } from "@/components/ui/card";
import { Current } from "@/models/getCurrent";
import { Cloud, Compass, Droplets, Sun, Thermometer, Wind } from "lucide-react";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  gap: 16px;
`;

const DetailsWeather: React.FC<{ current: Current | undefined }> = ({
  current,
}) => {
  return (
    <Card
      style={{
        minWidth: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "32px",
      }}
    >
      <Row>
        <Droplets className="h-4 w-4" />
        <span className="body_medium">Humidity: {current?.humidity}%</span>
      </Row>
      <Row>
        <Sun className="h-4 w-4" />
        <span className="body_medium">UV: {current?.uv_index}/10</span>
      </Row>
      <Row>
        <Cloud className="h-4 w-4" />
        <span className="body_medium">Cloud Cover: {current?.cloudcover}%</span>
      </Row>
      <Row>
        <Thermometer className="h-4 w-4" />
        <span className="body_medium">Pressure: {current?.pressure}</span>
      </Row>
      <Row>
        <Wind className="h-4 w-4" />
        <span className="body_medium">
          Wind speed: {current?.wind_speed} km/h
        </span>
      </Row>
      <Row>
        <Compass className="h-4 w-4" />
        <span className="body_medium">Wind direction: {current?.wind_dir}</span>
      </Row>
    </Card>
  );
};
export default DetailsWeather;
