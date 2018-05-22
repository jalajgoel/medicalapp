import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import users from '../../state';
import Modal from './Modal';

class Alerts extends Component {
    constructor(props){
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.state = {
            modal: false,
            id: '',
            alertData: '',
            alerts: users.users[0].alert,
        }

    }

    handleOpen(e){
        this.setState({
            modal: true,
            id: e.target.dataset.id
        })
        var id = e.target.dataset.id;
        var alertData = users.users[0].alert.map((alert, i) => {
            if(id === JSON.stringify(alert.id)){
                this.setState({
                  alertData: alert
                })
            }
        });
        var element = document.getElementById("body");
        element.classList.add("overlaphide");
    }

    submitModal(e){
        var pop = this.state.alerts.filter((alert) => {
            return this.state.id !== JSON.stringify(alert.id)
        });
        this.setState({
            alerts: pop
        })
        this.closeModal();
    }

    closeModal(e){
        this.setState({modal:false});
        var element = document.getElementById("body");
        element.classList.remove("overlaphide");
    }

    render() {
        var alert = this.state.alerts.map((data,i) => {
            if(i < 5){
                return(
                    <a key={i} className="lists-items Alerts-section alerts" id={data.id} data-id={data.id} onClick={this.handleOpen}>
                     <span className="li2 p10 notbold alert_font" data-id={data.id} onClick={this.handleOpen}>
                       {i<2 ? (<strong data-id={data.id}>{data.title} </strong>) :
                        data.title
                       } 
                     <span data-id={data.id} className={data.high=== 1 ? 'red alerts_sub' :'alerts_sub gray_alert'}>
                            {data.type} 
                     <span data-id={data.id} className="dot"> <i data-id={data.id} className="zmdi zmdi-circle"></i></span>
                     {data.date}
                     </span>
                    </span>
                    <span data-id={data.id} className="li3"><i className="zmdi zmdi-chevron-down"></i></span>
                   </a>
                );
            }
        });
        return (
            <div>
                <div className=" text-left Alerts-section whitebg pb0">
                    <div className="c-heading">
                    <i className="zmdi zmdi-alert-circle"></i> <span>Alerts</span>
                    </div>

                { alert }

                <a className="lists-items-anc" >
                 {this.state.alerts.length ===0 ? "NO ALERTS FOUND" : 'SEE ALL ALERTS'}
                </a>
                </div>
                {this.state.modal ? (<Modal from='alert' info={this.state.alertData} submitModal={this.submitModal.bind(this)} closeModal={this.closeModal.bind(this)}/>) : ''}
            </div>
        );
    }
}

export default Alerts;
