import Header from "./components/header";
import Navbar from "./components/Navbar";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Location from "./components/location";
import Login from "./components/Login";
import Addlocations from "./components/Addlocations";
import Registration from "./components/Registration";
import Tour from "./components/Tour";
import FormSubmit from "./components/formSubmit";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Header/>}/>
        <Route path="/location" element={<Location/>}/>
        <Route path="/submit" element={<FormSubmit/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/tour" element={<Tour/>}/>
        <Route path="/addlocation" element={<Addlocations/>}/>
        <Route path="/registration" element={<Registration/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
