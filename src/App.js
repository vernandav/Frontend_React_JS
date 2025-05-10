import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Nav';
import Routing from './components/Routing';

function App() {
    return (
    <BrowserRouter>
      <Navbar />
      <Routing />
    </BrowserRouter>
    );
}

export default App;
