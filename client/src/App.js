import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Users from './components/Users';
import NavbarExample from './layouts/Navbar';
import Syllabus from './components/Syllabus';
import routes from './auth/helpers/routes';
import SyllabusUsers from './components/SyllabusUsers';
import AccountPage from './components/Account';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        
        <Routes>
          <Route path={routes.home} element={<NavbarExample/>}>
              <Route index element={<Home/>}/>
              <Route path={routes.users} element={<Users/>}/>
              <Route path={routes.login} element={<Login/>}/>
              <Route path={routes.plan} element={<Syllabus/>}/>
              <Route path={routes.plans} element={<SyllabusUsers/>}/>
              <Route path={routes.account} element={<AccountPage/>}/>
              <Route path="*" element={ <Navigate replace to="/"/> } />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer/>

    </div>
  );
}

export default App;
