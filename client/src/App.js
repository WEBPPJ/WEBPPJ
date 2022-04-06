import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import NavbarExample from './layouts/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavbarExample/>}>
              <Route index element={<Home/>}/>
              <Route path="user/login" element={<Login/>}/>
              <Route path="user/register" element={<Register/>}/>
              <Route path="plan" element={<Register/>}/>
              <Route path="*" element={ <Navigate replace to="/"/> } />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
