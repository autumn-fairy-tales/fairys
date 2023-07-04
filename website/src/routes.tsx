import React from 'react';
import { useRoutes, Outlet } from 'react-router';
// @ts-ignore
import router_config from '@/.cache/routes_config';
const Route = () => {
  const render = useRoutes([...router_config]);
  return (
    <React.Fragment>
      {render}
      <Outlet />
    </React.Fragment>
  );
};
export default Route;
