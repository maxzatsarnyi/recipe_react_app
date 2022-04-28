import { AnimatePresence } from 'framer-motion';
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Cuisine from '../pages/Cuisine';
import Recipe from '../pages/Recipe';
import Searched from '../pages/Searched';

const Home = lazy(() => import('../pages/Home'));

export const Routes = () => {
  const routeConfig = useRoutes([
    {
      path: `/`,
      element: <Home />,
    },
    {
      path: `/cuisine`,
      element: <Cuisine />,
      children: [
        {
          path: `:type`,
          element: <Cuisine />,
        },
      ],
    },
    {
      path: `/searched`,
      element: <Searched />,
      children: [
        {
          path: `:search`,
          element: <Searched />,
        },
      ],
    },
    {
      path: `/recipe`,
      element: <Recipe />,
      children: [
        {
          path: `:name`,
          element: <Recipe />,
        },
      ],
    },
  ]);
  return <AnimatePresence exitBeforeEnter>{routeConfig}</AnimatePresence>;
};
