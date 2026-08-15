import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { routes } from './routes';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="bg-primary text-white p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚚</span>
              <span className="text-xl font-bold">SIGMA-T</span>
            </div>
            <div className="flex gap-6">
              <Link to="/" className="hover:text-primaryLight transition">Dashboard</Link>
              <Link to="/envios" className="hover:text-primaryLight transition">Envíos</Link>
              <Link to="/rutas" className="hover:text-primaryLight transition">Rutas</Link>
              <Link to="/flota" className="hover:text-primaryLight transition">Flota</Link>
            </div>
          </div>
        </nav>

        {/* Contenido */}
        <div className="container mx-auto py-6">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;