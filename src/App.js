import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetails from './pages/MovieDetails';
import SignUp from './pages/SignUp';
import Signin from './pages/Signin';
import WatchList from './pages/WatchList';

function App() {
  return (
   <Router>
    <Routes>
      <Route path='/' element = {<HomePage/>}/>
      <Route path='/movie/:id' element = {<MovieDetails/>}/>
      <Route path='/signup' element ={<SignUp/>}/>
      <Route path='/signin' element ={<Signin/>}/>
      <Route path='/watchlist' element ={<WatchList/>}/>
    </Routes>
   </Router>
  );
}

export default App;
