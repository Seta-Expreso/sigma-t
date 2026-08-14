import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { EnviosPage } from './pages/EnviosPage';
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
              <Link to="/" className="hover:text-blue-300 transition">Dashboard</Link>
              <Link to="/envios" className="hover:text-blue-300 transition">Envíos</Link>
              <Link to="/rutas" className="hover:text-blue-300 transition">Rutas</Link>
              <Link to="/flota" className="hover:text-blue-300 transition">Flota</Link>
            </div>
          </div>
        </nav>

        {/* Contenido */}
        <div className="container mx-auto py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/envios" element={<EnviosPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

// Página de inicio simple
function HomePage() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-primary mb-4">🚚 SIGMA-T</h1>
      <p className="text-lg text-gray-600 mb-2">
        Sistema Integral de Gestión para MiPYME de Transporte
      </p>
      <p className="text-sm text-gray-400">
        Bienvenido al sistema de gestión. Seleccione una opción del menú.
      </p>
    </div>
  );
}

export default App;