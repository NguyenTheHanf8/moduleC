import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <>
      <h1>404 Not Found</h1>
      <Link to="/">Go back home</Link>
    </>
  );
};

export default NotFoundPage;
