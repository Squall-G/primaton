import { Card } from "@/components/ui/card";
import { GetCurrent } from "@/models/getCurrent";
import { secondary, white } from "@/utils/colors";
import { handleUnitOfMeasure } from "@/utils/functions";
import moment from "moment";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-x: hidden;
`;

const Content = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
`;

const CustomCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  min-width: 240px;
  cursor: pointer;

  &:hover {
    background: ${secondary};
  }
`;

const CardsList: React.FC<{
  label: string;
  data: GetCurrent[];
  handleFetchLocation: (value: string) => void;
}> = ({ label, data, handleFetchLocation }) => {
  return (
    <Container>
      <span style={{ color: white }} className="title_medium">
        {label}
      </span>
      <Content>
        {data.length > 0 ? (
          data.map((el, index) => (
            <CustomCard
              onClick={() => handleFetchLocation(el.location?.name || "")}
              key={index}
            >
              <span className="title_medium">{el.location?.name}</span>
              <span className="body_small">
                {moment(el.location?.localtime).format("DD/MM/yyyy h:mm a")}
              </span>
              <span className="body_small">
                {el.current?.temperature}° C -{" "}
                {handleUnitOfMeasure(el.current?.temperature, "F")}° F
              </span>
            </CustomCard>
          ))
        ) : (
          <span style={{ color: white }}>There are no elements.</span>
        )}
      </Content>
    </Container>
  );
};
export default CardsList;
