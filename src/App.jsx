import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import Auhtor from "./components/Author/Author";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import ServerStatus from "./components/ServerStatus/ServerStatus";
import Publisher from "./components/Publisher/Publisher";
import Category from "./components/Categories/Category";
import Book from "./components/Book/Book";
import Borrow from "./components/Borrow/Borrow";

function App() {
  return (
    <>
      <ServerStatus></ServerStatus>
      <Router>
        <div className="general-container">
          <Navbar />
          {/* Sayfa yönlendirme rotalarını burada tanımlıyoruz */}
          <Routes>
            <Route path="/author" element={<Auhtor />} />
            <Route path="/publisher" element={<Publisher />} />
            <Route path="/category" element={<Category />} />
            <Route path="/book" element={<Book />} />
            <Route path="/borrow" element={<Borrow />} />

            <Route path="/" element={<Home />} />
            {/* İleride diğer sayfalar için buraya ek rotalar ekleyebilirsiniz */}
          </Routes>
          <Footer></Footer>
        </div>
      </Router>
    </>
  );
}

export default App;
