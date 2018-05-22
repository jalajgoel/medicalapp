import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Index extends Component {
    render() {
        return (
            <div className="container" id="header">
                <div className={this.props.profile==='profile' ? "row fixed-top profile-header" : "row"}>
                    <div className={this.props.profile==='profile' ? 'top-bar tbbs blue' : 'top-bar tbbs'} id="responsive-menu">
                    <div className="top-bar-left">
                        <ul className={this.props.profile==='profile' ? 'dropdown menu blue' : "dropdown menu"} data-dropdown-menu>
                        <li className={this.props.profile==='profile' ? 'menu-text white' : "menu-text"}>{this.props.profile==='profile' ? this.props.name : 'WPC App'}</li>
                        </ul>
                    </div>
                    <div className="top-bar-right">
                      <NavLink to='/profile' className={this.props.profile==='profile' ? "home-anc white" : ''}> <i className="zmdi zmdi-menu zmdi-hc-2x"></i></NavLink>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
