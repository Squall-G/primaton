import { GetCurrent } from "../models/getCurrent";
import { mock_current } from "./mock";

export const fetchLocation = async (location: string): Promise<GetCurrent> => {
  if (import.meta.env.VITE_MOCK === true) {
    return mock_current[Math.floor(Math.random() * 4)];
  }
  const key = "b3c5b52569492b97a7678ed2e9f1ecd8";
  const response = await fetch(
    `http://api.weatherstack.com/current?access_key=${key}&query=${location}`
  );
  return response.json();
};
