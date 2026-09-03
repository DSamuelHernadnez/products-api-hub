import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Vistas
import LandingPage from './views/LandingPage/LandingPage';
import Home from './views/Home/Home';
// import CreateProducts from './views/CreateProducts/CreateProducts';
import Detail from './views/Detail/Detail';

// Componentes
import Nav from './components/Nav/NavBar';
import { useLocation } from 'react-router-dom';
import './App.css';

function App() {
   const location = useLocation();
   const isLandingPage = location.pathname === '/';

   return (
      <div className="App">
         {/* Renderizamos el Nav solo si NO estamos en la Landing Page */}
         {!isLandingPage && <Nav />}

         <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path='/createProducts' element={<h1> Welcome To CreateProducts </h1>} />
            <Route path='/product/:id' element={<Detail />} />
         </Routes>
      </div>
   );
}

export default App;