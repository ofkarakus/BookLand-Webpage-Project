import { BookInfo } from "./";
import { useLocation } from 'react-router-dom'

const Details = () => {
  const {state} = useLocation();

  return <BookInfo item={state} />;
};

export default Details;
