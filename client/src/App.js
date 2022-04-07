import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Users from './components/Users';
import NavbarExample from './layouts/Navbar';
import Syllabus from './components/Syllabus';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavbarExample/>}>
              <Route index element={<Home/>}/>
              <Route path="users" element={<Users/>}/>
              <Route path="users/login" element={<Login/>}/>
              <Route path="users/register" element={<Register/>}/>
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
