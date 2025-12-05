import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sign from "./pages/Signup";
import About from "./pages/About";
import ShowNearbyGarages from "./pages/ShowNearbyGarages";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/about" element={<About />} />
        <Route path="/shownearbygarages" element={<ShowNearbyGarages />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
