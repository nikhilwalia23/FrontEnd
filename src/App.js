//import {useState} from 'react';
import './App.css';
import Navbar from './componets/Navbar';
import Home from './componets/Home';
import  About from './componets/About';
import Profile from "./componets/profile";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Authentication from './componets/Authentication';
import CarDetails from './componets/small_components/CarDetails';
import Contact from './componets/Contact';
import ResetForm from "./componets/resetForm";
import Payment from './componets/Payment';

function App() {
  //let [login,SetLogin] = useState(false);
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar/>}>
          <Route   index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/singin' element={<Authentication/>} />
          <Route path='/cardetails' element={<CarDetails/>} />
          <Route path='/resetForm/:token' element={<ResetForm/>} />
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/payment' element={<Payment/>}/>
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
