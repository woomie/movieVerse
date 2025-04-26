import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' element = {<HomePage/>}/>
      <Route path='/movie/:id' element = {<MovieDetails/>}/>
    </Routes>
   </Router>
  );
}

export default App;
