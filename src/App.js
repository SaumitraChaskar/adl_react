/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserMd, faSignOutAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



// import Login from "./components/login.component";
import SignMain from './components/signmain.component';
import Admin from './components/admin.component';
import Login from './components/login.component';
import DocDashboard from './components/docDashboard.component';
import HospDashboard from './components/hospDashboard.component';
import Menu from './components/menu.component';

import hospitalLogo from './assets/images/hospital.png'
import Inventory from './components/inventory.component';
library.add(faUserMd, faSignOutAlt, faPlusCircle)

function App() {

  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));

  function refreshPage() {
    setTimeout(()=>{
        window.location.reload(false);
    }, 500);
    console.log('page to reload')
}

  const handleLogout = () => {
    localStorage.clear();
    refreshPage();
    history.push("/sign-in");
  };

  const imageStyle = {
    height: "30px",
    width: "25px"
  }


  return (<Router>
    <div className="App">
      {!localStorage.getItem("user") && <nav className="navbar navbar-expand-lg navbar-light nav-margin">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>Zerogya <span><img src={hospitalLogo} style={imageStyle}></img></span></Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item nav-ele">
                <Link className="nav-link btn btn-primary" to={"/sign-in"}><span style={{color:"white"}}>Login</span></Link>
              </li>
              <li className="nav-item nav-ele">
                <Link className="nav-link btn btn-primary" to={"/sign-main"}><span style={{color:"white"}}>Register</span></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>}

      {(localStorage.getItem("user") && user.role === "admin") && <nav className="navbar navbar-expand-lg navbar-light nav-margin">
        <div className="container">
          <Link className="navbar-brand" to={"/admin"}>Zerogya <span><img src={hospitalLogo} style={imageStyle}></img></span></Link>
          
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item nav-ele">
                <span><FontAwesomeIcon style={{alignContent:"center", marginLeft:"10px"}} icon="user-md" size="2x" /></span>
                <span></span>
              </li>
              <li className="nav-item nav-ele">
              <Menu doc_name={user.name}></Menu>
              </li>
              <li className="nav-item nav-ele">
              <FontAwesomeIcon  type="button" onClick={handleLogout} style={{alignContent:"center"}} icon="sign-out-alt" size="2x" />
              </li>
            </ul>
          </div>
        </div>
      </nav>}

      {(localStorage.getItem("user") && user.role === "doctor") && <nav className="navbar navbar-expand-lg navbar-light nav-margin">
        <div className="container">
          <Link className="navbar-brand" to={"/doc-dashboard"}>Zerogya <span><img src={hospitalLogo} style={imageStyle}></img></span></Link>
          
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item nav-ele">
                <span><FontAwesomeIcon style={{alignContent:"center", marginLeft:"10px"}} icon="user-md" size="2x" /></span>
                <span></span>
              </li>
              <li className="nav-item nav-ele">
              <Menu doc_name={user.name}></Menu>
              </li>
              <li className="nav-item nav-ele">
              <FontAwesomeIcon  type="button" onClick={handleLogout} style={{alignContent:"center"}} icon="sign-out-alt" size="2x" />
              </li>
            </ul>
          </div>
        </div>
      </nav>}

      {(localStorage.getItem("user") && user.role === "hospital") && <nav className="navbar navbar-expand-lg navbar-light nav-margin">
        <div className="container">
          <Link className="navbar-brand" to={"/hosp-dashboard"}>Zerogya <span><img src={hospitalLogo} style={imageStyle}></img></span></Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item nav-ele">
                <span><FontAwesomeIcon style={{alignContent:"center", marginLeft:"10px"}} icon="user-md" size="2x" /></span>
                <span></span>
              </li>
              <li className="nav-item nav-ele">
              <Menu doc_name={user.name}></Menu>
              </li>
              <li className="nav-item nav-ele">
              <FontAwesomeIcon  type="button" onClick={handleLogout} style={{alignContent:"center"}} icon="sign-out-alt" size="2x" />
              </li>
            </ul>
          </div>
        </div>
      </nav>}


      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path="/" component={Login}>
              <Login>
              </Login>
            </Route>
            <Route path="/sign-in" component={Login}>
              <Login>
              </Login>
            </Route>
            <Route path="/sign-main" component={SignMain}>
              <SignMain hospRegister={false} docRegister={false}>
              </SignMain>
            </Route>
            <Route path="/admin" component={Admin}>
              <Admin>
              </Admin>
            </Route>
            <Route path="/doc-dashboard" component={DocDashboard}>
              <DocDashboard>
              </DocDashboard>
            </Route>
            <Route path="/hosp-dashboard" component={HospDashboard}>
              <HospDashboard>
              </HospDashboard>
            </Route>
            <Route path="/inventory" component={Inventory}>
              <Inventory>
              </Inventory>
            </Route>
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
