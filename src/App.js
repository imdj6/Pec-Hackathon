import './App.css';
import NavBar from './components/NavBar'
import HomePage from './components/HomePage';
import { app } from './firebase';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <>
    <NavBar/>
    <HomePage/>

    </>
  );
}

export default App;
