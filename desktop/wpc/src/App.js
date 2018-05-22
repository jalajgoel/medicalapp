import React, { Component } from 'react';
import { BrowserRouter, Route,Redirect } from 'react-router-dom';
import Switch from 'react-router-dom/Switch';
import Home from './components/Home/Home';
import Header from './components/Common'
import ImageSlider from './components/ProfileSlider/Slider'
import ProfileDetails from './components/Profile/ProfileDetails';
import Location from './components/Profile/location';
import Encounter from './components/Encounter/Encounter';
import View_proto from './components/Home/View_proto';
import Signin from './components/Signin/Signin';
import Welcome from './components/Welcome/Welcome';
import Ol from './components/Ol/Ol';
import Cookies from 'universal-cookie';
import 'sweetalert/dist/sweetalert.css';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      redirect: false,
      info: ''
    }
  }

  redirect(e){
    this.setState({
      redirect: true
    })
  }

  render() {
    var cookie = new Cookies();
    var token = cookie.get('logged_in');
    return (
      <BrowserRouter>
        <div className="App">
          {!this.state.redirect ? <Header /> : ""}
            <Switch>
              <Route exact path="/" component={View_proto} />

               <Route path="/login"   render={()=>(
                token ? (
                  <Redirect to="/welcome"/>
                ) : (
                  <Signin />
                )
              )} />

              <Route path="/welcome"  render={(props)=>(
              token ? (
                <Welcome redirect = {this.redirect.bind(this)} {...props}/>
              ) : (
                <Redirect to="/login" />
              )
             )} />

             <Route path="/ol"  render={(props)=>(
              token ? (
                <Ol redirect = {this.redirect.bind(this)} {...props}/>
              ) : (
                <Redirect to="/login" />
              )
            )} />
              <Route path="/search" component={Home} />

              <Route path="/profile-details/:id"  render={(props)=>(
              token ? (
              <ProfileDetails redirect = {this.redirect.bind(this)} {...props}/>
              ) : (
                <Redirect to="/login" />
              )
            )} />


              <Route path="/encounter"  render={(props)=>(
              token ? (
              <Encounter redirect = {this.redirect.bind(this)} info={this.state.info} {...props}/>
              ) : (
                <Redirect to="/login" />
              )
            )} />
          </Switch>
        </div>
      </BrowserRouter> 
    );
  }
}

export default App;
