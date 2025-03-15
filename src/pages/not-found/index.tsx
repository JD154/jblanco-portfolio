// Add a NotFound component
import { useRouteError } from 'react-router-dom';

export const NotFound = () => {
  const error = useRouteError();
  console.error(error);
  return <h1>404 - Page Not Found</h1>;
};
