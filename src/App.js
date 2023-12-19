import "./App.css";
import Navbar from "./components/Navbar.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About.js";
import Home from "./components/Home.js";
import NoteState from './context/notes/NoteState.js'

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
         
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
