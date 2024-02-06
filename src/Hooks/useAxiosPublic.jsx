import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://weather-alpaago-server.vercel.app/",
})

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;