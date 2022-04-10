import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Users from './components/Users';
import NavbarExample from './layouts/Navbar';
import Syllabus from './components/Syllabus';
import routes from './auth/helpers/routes';
import PrivateRoute from './routers/PrivateRoute';
import PublicRoute from './routers/PublicRoute';
import AuthProvider from './auth/AuthProvider';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        
        <Routes>
          <Route path={routes.home} element={<NavbarExample/>}>
              <Route index element={<Home/>}/>
              <Route path={routes.users} element={<Users/>}/>
              <Route path={routes.login} element={<Login/>}/>
              <Route path={routes.register} element={<Register/>}/>
              <Route path={routes.plan} element={<Register/>}/>
              <Route path="*" element={ <Navigate replace to="/"/> } />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer/>

    </div>
  );
}

export default App;
