import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login-Signup/Login';
import Signup  from './Login-Signup/Signup';
import IntroPg from './IntroPg/Intropg';
import HomePg from './HomePg/HomePg';
import Tracker from './Tracker/Tracker';
import Navigation from './Login-Signup/Navigation';
import Theory from './Theory/Theory';

function App() {
  return (
    <div className='container'>
      <Navigation/>
    <Router>
      <Routes>
        <Route path="/" element={<IntroPg />} />
        <Route path="/tracker" element={<Tracker />} />
        {/* <Route path="/home" element={<HomePg />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/theory" element={<Theory />} /> */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
