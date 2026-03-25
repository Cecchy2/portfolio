import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import MyNavBar from "./components/MyNavBar";
import ParticlesBackground from "./components/ParticlesBackground";

function App() {
  return (
    <BrowserRouter>
      <ParticlesBackground />
      <MyNavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
