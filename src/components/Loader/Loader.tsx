import { ThreeDots } from "react-loader-spinner";

export const Loader = () => (
  <ThreeDots
    height="80"
    width="80"
    color="#318ce7"
    radius="9"
    ariaLabel="three-dots-loading"
    wrapperStyle={{ justifyContent: "center" }}
  />
);
