import "./Header.css"
import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

class Header extends Component {
    render(){
        if(this.props.location.pathname !== '/'){
        return(
            <header>
                <div className="Logo">
                    Logo
                </div>
                <div className="Username">
                    Username
                </div>
                <div className="Nav">
                    <ul>
                        <Link to="/home" className="Navls">Home</Link>
                        <Link to="/addnew" className="Navls">AddNew</Link>
                        <Link to="/instructions" className="Navls">Instructions</Link>
                        <Link to="/" className="Navls">Logout</Link>
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

export default withRouter(Header)