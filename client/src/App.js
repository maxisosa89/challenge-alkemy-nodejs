import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Genres from './components/Genres';


function App() {

  return (
    <BrowserRouter>
      <div className="App" >
        <Routes>
          <Route path= '/' element={<Home />} />
          <Route path= '/genres' element={<Genres />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
