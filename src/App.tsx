import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Navbar2 from './components/navbar/Navbar';
import Home from './components/home/Home';
import Background from './images/clinique.jpg';
import Auth from './components/auth/auth';
import Register from './components/register/register';
import User from './components/user/user';
import { AuthProvider } from './contexts';
import DoctorPage from './components/doctor/doctor-page';

import PrivateRouteForLoggedUsers from './private-route';


function App() {
  return (
    <div className="App MaxHeight" style={{ backgroundImage: `url(${Background})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center center fixed" }}>
      <AuthProvider>
        <BrowserRouter>
          <div id="main-page-cont">
            <Navbar2></Navbar2>
            <div id="main-page-2">
              <Switch>
             
                <Route exact path='/' component={Home} />
                <Route exact path='/home' component={Home} />
                <Route path='/auth' component={Auth} />
                <Route path='/register' component={Register} />
                <PrivateRouteForLoggedUsers>
                <Route path='/user' component={User} />
                <Route path='/doctor' component={DoctorPage} />
                </PrivateRouteForLoggedUsers>
              </Switch>
            </div>

            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div >
  );
}

export default App;
