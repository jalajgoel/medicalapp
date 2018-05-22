import React, { Component } from 'react';
import logo from '../../images/logo.jpg';
import { NavLink } from 'react-router-dom';
import Index from '../Common/index';

class Home extends Component {
    render() {
        return (
            <div className="blue home-bg">
                <Index />
                <div className="container">
                    <div className="row">
                        <div className="columns small-12">
                            <div className="container-1 home">
                                <div className="logo-container">
                                    <img src={logo} alt="logo"/>
                                </div>
                                <p>
                                    This is a Whole Person Care App prototype RideAlong created with the San Francisco Department of Public Health through the Startup in Residence Progarm.
                                </p>
                                <ul>
                                    <li>
                                    It demonstrates :
                                    </li>
                                    <li>
                                    1) How fields are auto-populated.
                                    </li>
                                    <li>
                                    2) How providers can quickly view patient profiles and update information in the field.
                                    </li>
                                </ul>
                                <p>
                                    You won't be asked to enter any data, just tap around and see the demo.
                                </p>
                                <p className="last-p">
                                    Questions ? <br/>
                                    team@getridealong.com
                                </p>
                                <NavLink className="button custom-button-1" to="/login">View Prototype</NavLink>
                            </div>
                            
                        </div>
                    </div>
                </div>      
            </div>
        );
    }
}

export default Home;
