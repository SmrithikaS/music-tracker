import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './Login-Signup/Login';
import Signup  from './Login-Signup/Signup';
import IntroPg from './IntroPg/Intropg';
import HomePg from './HomePg/HomePg';
import Tracker from './Tracker/Tracker';
import Navigation from './Login-Signup/Navigation';
import Theory from './Theory/Theory';
import Image1Page from './Theory/Image1';
import Image2Page from './Theory/Image2';
import Image3Page from './Theory/Image3';
import Image4Page from './Theory/Image4';
import Image5Page from './Theory/Image5';
import Image6Page from './Theory/Image6';
import Image7Page from './Theory/Image7';
import { CookiesProvider, useCookies } from 'react-cookie'

function App() {
  const [cookies, setCookie] = useCookies(['user'])
  
  function handleLogin(user) {
    setCookie('user', user, { path: '/' })
  }

  function handleLogout(){
    setCookie('user',undefined,{path: '/'})
  }

  return (
    <div className='container'>
      
    <Router>
    <Navigation onLogout={handleLogout}/>
    <CookiesProvider>
      <Routes>
        <Route path="/" element={<IntroPg />} />
        {/* <Route path="/tracker" element={<Tracker />} /> */}
        <Route path="/home" element={cookies.user && cookies.user.userId ? <HomePg user={cookies.user} /> : <Login onLogin={handleLogin}/>} />
        <Route path="/tracker" element={cookies.user && cookies.user.userId ? <Tracker userId={cookies.user.userId} />:<Login onLogin={handleLogin}/>} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/theory" element={<Theory/>}/>
        <Route path="/image1" element={<Image1Page/>}/>
        <Route path="/image2" element={<Image2Page/>}/>
        <Route path="/image3" element={<Image3Page/>}/>
        <Route path="/image4" element={<Image4Page/>}/>
        <Route path="/image5" element={<Image5Page/>}/>
        <Route path="/image6" element={<Image6Page/>}/>
        <Route path="/image7" element={<Image7Page/>}/>
      </Routes>
    </CookiesProvider>
    </Router>
    </div>
  );
}

export default App;
