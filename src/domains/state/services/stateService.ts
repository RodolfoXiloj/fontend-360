import apiClient from "../../../app/apiClient";
import { State } from "../models/State";

export const fetchStates = async (): Promise<State[]> => {
  const response = await apiClient.get("estados"); 
  return response.data;
};
