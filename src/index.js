import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Diease from './pages/Diease';
import Calculator from './pages/Diease/Calculator';
import Result from './pages/Diease/Calculator/Result';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          exact
          path='/'
          element={<App />}
        ></Route>
        <Route
          exact
          path='/:disease'
          element={<Diease />}
        ></Route>
        <Route
          exact
          path='/:disease/calculator'
          element={<Calculator />}
        ></Route>
        <Route
          exact
          path='/:disease/calculator/:result/result'
          element={<Result />}
        ></Route>
        <Route
          path='*'
          element={<Navigate to='/' />}
        />
      </Routes>
    </Router>
    <Toaster />
  </React.StrictMode>
);
