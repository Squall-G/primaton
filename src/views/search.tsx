import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Terminal } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";
import { Error as ErrorInterface } from "../models/getCurrent";
import { breakpoints } from "@/utils/breakpoints";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Top = styled.div<{ $center: boolean }>`
  width: 100%;
  display: flex;
  gap: 24px;
  justify-content: ${(props) => (props.$center ? "center" : "space-between")};

  @media (max-width: ${breakpoints.sm}px) {
    flex-direction: reverse-column;
  }
`;

const Content = styled.div<{ $center: boolean }>`
  display: flex;
  gap: 16px;
`;

const Search: React.FC<{
  loading: boolean;
  handleFetchLocation: (value: string) => Promise<void>;
  error: ErrorInterface | null;
  logo?: boolean;
  center?: boolean;
}> = ({
  loading,
  handleFetchLocation,
  error,
  logo = false,
  center = false,
}) => {
  const [location, setLocation] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleFetchLocation(location);
    }
  };

  return (
    <Container>
      <Top $center={center}>
        <Content $center={center}>
          <Input
            placeholder="Enter a location"
            value={location}
            onChange={(value) => setLocation(value.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={() => handleFetchLocation(location)}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              <>Search</>
            )}
          </Button>
          {/* <Button variant="secondary" size="icon">
            <MapPin className="mr-2 h-4 w-4" />
          </Button> */}
        </Content>
        {logo && <img src="/logo.svg" width={"40px"} />}
      </Top>
      {error && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Ops! Something went wrong</AlertTitle>
          <AlertDescription>{error?.info}</AlertDescription>
        </Alert>
      )}
    </Container>
  );
};
export default Search;
