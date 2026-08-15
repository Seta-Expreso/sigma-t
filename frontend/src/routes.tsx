/**
 * @fileoverview Definición de rutas de la aplicación
 * @module routes
 */

import type { RouteObject } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { EnviosPage } from './pages/EnviosPage';

// Páginas futuras
// import { RutasPage } from './pages/RutasPage';
// import { FlotaPage } from './pages/FlotaPage';
// import { ChoferesPage } from './pages/ChoferesPage';
// import { FinanzasPage } from './pages/FinanzasPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/envios',
    element: <EnviosPage />,
  },
  // Rutas futuras
  // {
  //   path: '/rutas',
  //   element: <RutasPage />,
  // },
  // {
  //   path: '/flota',
  //   element: <FlotaPage />,
  // },
  // {
  //   path: '/choferes',
  //   element: <ChoferesPage />,
  // },
  // {
  //   path: '/finanzas',
  //   element: <FinanzasPage />,
  // },
];