import { GetCurrent } from "../models/getCurrent";
import { mock_current } from "./mock";

export const fetchLocation = async (location: string): Promise<GetCurrent> => {
  console.log(import.meta.env.VITE_MOCK);
  if (import.meta.env.VITE_MOCK === true) {
    console.log(mock_current);
    return mock_current[Math.floor(Math.random() * 4)];
  }
  const response = await fetch(
    `http://api.weatherstack.com/current?access_key=${
      import.meta.env.VITE_KEY
    }&query=${location}`
  );
  return response.json();
};
