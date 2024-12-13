import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import MyNavBar from "./components/myNavBar";

function App() {
  return (
    <BrowserRouter>
      <MyNavBar />
      <Routes>
        <Route path="/" element=<HomePage /> />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
