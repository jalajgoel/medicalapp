import React, { Component } from 'react';
import profile from '../../images/profile-pictures.jpg';
import { NavLink } from 'react-router-dom';
import Index from '../Common/index';
import data from '../../state';

class Drafts extends Component {
	constructor(props){
    super(props);
    this.state = { 
    	assigned_check:false,
      match:false,
      search:'',
    	drafts: [
           {
              'icon':profile,
	            'id': 1,
	            'title':'Gonzalez, Mirabel S',                
	            'action':'profile-details',
              'date':' 06-22-2018', 
              'image':1,               
              'assigned':1,                                                            
            },
            {
              'icon':'zmdi-accounts',
              'id':2,
              'title':'Alvarez, Angela L',
              'action':'profile-details',
              'date':' 06-22-2018', 
              'image':0,               
              'assigned':0,                                                            
            }
    	],
       data: [
        {
          'icon':'zmdi-accounts',
          'id': 0,
          'title':'Alvarez, Angela L',
          'last_seen':' 04-17-2018',
          'action':'profile-details',
          'image':0,
          'day':'Today',
          'assigned':0,
            'dob': '03-28-1984',
            'sex': 'Female',
            'phone': '444-555-3333'
        },
        {
            'icon':profile,
            'id': 1,
            'title':'Gonzalez, Mirabel S',
            'last_seen':'04-10-2018',                
            'action':'profile-details',
            'image':1,
            'day':'Today',
            'assigned':1,
            'dob': '04-28-1984',
            'sex': 'Female',
            'phone': '444-555-4444'                
        }
      ],
      searchResult: ''
    }
    this.handleCheck=this.handleCheck.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.handleClick=this.handleClick.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
   if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
     this.setState({
       match: false
     });
    }
  }
  
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClick(){
    this.setState({
      data: this.state.searchResult,
      match: false
    })
  }
  handleCheck(e){
            this.setState({
                assigned_check: !this.state.assigned_check,
            })
    }
   handleChange(e){
    if(e.target.value !== ''){
      this.setState({search: e.target.value, match:true})
      var updatedList = this.state.data;
      updatedList = updatedList.filter((item) => {
        return item.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
      });
      this.setState({searchResult: updatedList});
    }else{
      this.setState({search: e.target.value, match:false})
    }
  }
    render() {
    	var draftData = this.state.drafts.map((data,i) => {
    		 if(this.state.assigned_check){
                 if(data.assigned === 1){
    		 return(
                 <NavLink to={`/${data.action}/${data.id}`} className="lists-items nonfilter" key={i} >
                <span className="li1">
                    <span>
                        {data.image === 0 ?
                            <i className="zmdi zmdi-account">
                        </i>
                        :<img src={data.icon} alt={data.title} />}
                    </span>
                </span>  
                <span className="li2">
                    {data.title}
                    <span>Draft Created: {data.date}</span>
                </span>
                <span className="li3">{data.day}</span>
              </NavLink>
               );
               }
              }  else {
              	return(
              		<NavLink to={`/${data.action}/${data.id}`} className="lists-items nonfilter" key={i} >
                <span className="li1">
                    <span>
                        {data.image === 0 ?
                            <i className="zmdi zmdi-account">
                        </i>
                        :<img src={data.icon} alt={data.title} />}
                    </span>
                </span>  
                <span className="li2">
                    {data.title}
                    <span>Draft Created: {data.date}</span>
                </span>
                <span className="li3">{data.day}</span>
              </NavLink>
              );
              }
    		
    	})
        return (
          <div>
              <Index/>
            <div className="container-2 saved-drafts-wrp pdt_48">
               <h2 className="text-left">Saved Encounter Drafts</h2>
               <div className="text-left"><p>{ this.state.drafts.length } Total</p></div>
                <div>
                <div className="md-checkbox"><input id="i3" type="checkbox" defaultChecked={this.state.assigned_check} name="assigned_check" onClick={this.handleCheck} /><label htmlFor="i3"></label></div>
                
                <span htmlFor="checkbox12">Assigned to me</span>
                </div>
               { draftData }
               <div className="search row small-12 medium-8 large-6 columns align-center">
                <input type="search" 
                  value={this.state.search} 
                  name="search" 
                  className="animated-search-form" 
                  onChange={this.handleChange} 
                />

                <span onClick={this.handleClick}><i className="zmdi zmdi-search"></i></span>
                 {this.state.match 
                    ? < div className = "searchResult"
                    ref = {
                      this.setWrapperRef.bind(this)
                    } >
                        <ul>
                          {this.state.searchResult.map((data, i) => <li onClick={()=>{this.setState({data: [data], search: data.title, match: false})}} key={i}>{data.title}</li>)}
                        </ul>
                      </div> 
                    : ""
                  }

                </div>
                </div>
            </div>
        );
    }
}

export default Drafts;

