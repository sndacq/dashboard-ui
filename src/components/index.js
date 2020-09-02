import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

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