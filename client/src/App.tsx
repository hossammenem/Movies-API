import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchResults from './pages/SearchResults';
import SingleMovie from './pages/SingleMovie';
import Watchlist from './pages/Watchlist';

function App() {
  return (
    <>
    <Router>
      { window.location.pathname.includes("login") || window.location.pathname.includes("register")
      ? <></> : <Header />} 
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/watchlist/:userId' element={<Watchlist />} />
            <Route path='/search-results/:title' element={<SearchResults />} />
            <Route path='movie/:title' element={<SingleMovie />} />
          </Routes>
      { window.location.pathname.includes("login") || window.location.pathname.includes("register")
      ? <></> : <Footer />} 
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;