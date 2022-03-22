import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Genres from './components/Genres';
import { useState, useEffect } from "react";
import Logout from "./components/Logout";

const logged = window.localStorage.getItem("logged")
if (logged) {
  const user = JSON.parse(logged)
  var token = user.token
  console.log(token)
}

function App() {


  return (
    <BrowserRouter>
      <div className="App" >
      <Logout />
        <Routes>
          <Route path= '/' element={<Home
            token={token} />} />
          <Route path= '/genres' element={<Genres
            token={token}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
