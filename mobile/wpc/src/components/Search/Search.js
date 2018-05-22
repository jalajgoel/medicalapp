    import React, { Component } from 'react';
import img from '../../images/profile-pictures.jpg';
import profile from '../../images/profile-pictures.jpg';
import { NavLink } from 'react-router-dom';
import Index from '../Common/index';
import history from '../../state';

class Search extends Component {
	constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state={
      match:false,
      search: '',
      data: history.users,
      history: history.history,
      showHistory: false,
      searchResult: ''
    };
  }
  handleClick(e){
    if(this.state.match){
        this.setState({
          data: this.state.searchResult,
          match: false
        })
    }
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
        match: false,
        showHistory: false
      });
    }
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleChange(e){
    if(e.target.value == ''){
        this.setState({search: e.target.value, match:false, showHistory: false})
    }else{
        this.setState({search: e.target.value, match:true, showHistory: false})
        var updatedList = this.state.data;
        updatedList = updatedList.filter((item) => {
          return item.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
        });
        this.setState({searchResult: updatedList});
    }
  }

  render() {
    return (
    	<div className="container-3 search-box no-margin">
        <Index />
        <h2 className="text-left">Paitent Search</h2>
        <div className="search row small-12 medium-8 large-6 columns align-center">
         <input type="search" 
            value={this.state.search} 
            name="search" 
            className="animated-search-form" 
            onChange={this.handleChange} 
            onClick={() => {this.setState({showHistory: true})}}
        />

        <span onClick={this.handleClick}><i className="zmdi zmdi-search"></i></span>
         {this.state.match 
            ? < div className = "searchResult searchResult-mob"
            ref = {
              this.setWrapperRef.bind(this)
            } >
                <ul>
                    {this.state.searchResult.length > 0 
                    ? this.state.searchResult.map((data, i) => 
                        <li onClick={()=>{this.setState({data: [data], match:false, search: data.title})}} key={i}>
                        <span className="search-list-icon"><i className="zmdi zmdi-search"></i></span>
                        {data.title}<span>{data.last_seen}</span>
                        </li>
                     )
                    : <li>No Results Found</li>
                    }
                </ul>
              </div> 
            : ""
          }
          {this.state.showHistory 
            ? < div className = "searchResult history searchResult-mob"
            ref = {
              this.setWrapperRef.bind(this)
            } >
                <ul>
                  {this.state.history.map((data, i) => <li onClick={()=>{this.setState({data: [data], match:false, search: data.title})}} key={i}><span className="search-list-icon"><i className="zmdi zmdi-time-restore"></i></span>{data.title}<span>{data.last_seen}</span></li>)}
                </ul>
              </div> 
            : ""
          }

        </div>
        <h2>Recent Searches</h2>
        <div className = "recentSearches recentSearches-mob" >
          {this.state.data.map((data,i) => {
            return(
              <NavLink className="lists-items nonfilter" to={`/${data.action}/${data.id}`} key={i} >
                <span className="li1">
                    <span>
                        {data.image === 0 ?
                            <i className="zmdi zmdi-account">
                        </i>
                        :<img src={require('../../images/'+data.icon)} alt={data.title} />}
                    </span>
                </span>  
                <span className="li2">
                    {data.title}
                    <span>Last seen: {data.last_seen}</span>
                </span>
                <span className="li3">{data.day}</span>
              </NavLink>    
            )
          })}
            
        </div>
      </div>
    )
  }
}

export default Search ;