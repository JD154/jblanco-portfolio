// Add a NotFound component
import { FC } from 'react';
import { useRouteError } from 'react-router-dom';

export const NotFound: FC = () => {
  const error = useRouteError();
  console.error(error);
  return <h1>404 - Page Not Found</h1>;
};
