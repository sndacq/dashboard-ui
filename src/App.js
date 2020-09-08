import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';

import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

import "./style.css";

function App() {
  return (
    <Router>
      <Header />
      <Body />
      <Footer />
    </Router>
  );
}

export default App;