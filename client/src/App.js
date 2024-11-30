
import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
// import { BrowserRouter as Routes, Route, Switch } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Footer from './pages/Footer';
import OurProduct from './pages/OurProduct.jsx';
import Implants from './pages/Implants.jsx';
import Instruments from './pages/Instruments.jsx';
import About from './pages/About.jsx';
import ContactUs from './pages/ContactUs.jsx';
import Certificates from './pages/Certificates.jsx';
import GetdealerShip from './components/GetdealerShip.jsx';
import Catalog from './pages/Catalog.jsx';
import Thumbnail from './pages/Thumbnail.jsx';
import Socialicons from './components/Socialicon.jsx';
import InstrumentProduct from './pages/InstrumentProduct.jsx';




function App() {

  return (
   <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/About-us" element={<About/>}/>
        <Route path="/Ourproduct" element={<OurProduct/>} />
        <Route path="/Implants/:categoryName" element={<Implants/>}/>
        <Route path="/Instruments/:categoryName" element={<Instruments/>} />
        <Route path="/inplants-details/:name" element={<Thumbnail/>}/>
        <Route path="/instrument-details/:name" element={<InstrumentProduct/>}/>
         <Route path="/GetdealerShip" element={<GetdealerShip/>} /> 
        <Route path="/Certificates" element={<Certificates/>} />
        <Route path="/Catalog" element={<Catalog/>} />
        <Route path="/Contact-us" element={<ContactUs/>}/>
       
        
      </Routes>
      <Socialicons/>
    <Footer/>
  </BrowserRouter>
   </>
  );
}

export default App;
