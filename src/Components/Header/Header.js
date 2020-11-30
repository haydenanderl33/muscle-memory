import "./Header.css"
import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser} from '../../redux/reducer'
import axios from "axios"

class Header extends Component {
    constructor(){
        super();


    }

    handleLogout = () => {
        axios.post('/auth/logout');
        this.props.logoutUser()

    }


    render(){
        const {username} = this.props.user
        if(this.props.location.pathname !== '/'){
        return(
            <header>
                <div className="Logo">
                    Muscle Memory
                </div>
                <div className="Username">
                    {username}
                </div>
                <div className="Nav">
                    <ul>
                        <Link to="/home" className="Navls">Home</Link>
                        <Link to="/addnew" className="Navls">AddNew</Link>
                        <Link to="/instructions" className="Navls">Instructions</Link>
                        <Link to="/" className="Navls" onClick={()=> this.handleLogout()}>Logout</Link>
                    </ul>
                </div>
            </header>)}
            else {
                return(
                    <div>hello there</div>
                )
            }
        
    }
}

const mapDispatchToProps = {
    logoutUser
};

const mapStateToProps = (reduxState) => {
    const {user, isLoggedIn} = reduxState;
    return{
        user,
        isLoggedIn
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))