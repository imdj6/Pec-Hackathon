import './App.css';
import NavBar from './components/NavBar'
import HomePage from './components/HomePage';
import { app } from './firebase';

function App() {
  return (
    <>
    <NavBar/>
    <HomePage/>
    </>
  );
}

export default App;
