import "./Header.css";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, getUser } from "../../redux/reducer";
import axios from "axios";

class Header extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getUser();
  }

  handleLogout = () => {
    axios.post("/auth/logout");
    this.props.logoutUser();
  };

  render() {
    const { username } = this.props.user;
    if (this.props.location.pathname !== "/") {
      return (
        <header>
          <h2 className="logo">Muscle Memory</h2>
          <h3 className="username">{username}</h3>
          
            <li><Link to="/home" className="Navls">
              Home
            </Link></li>
            <li><Link to="/addnew" className="Navls">
              AddNew
            </Link></li>
            <li><Link to="/instructions" className="Navls">
              Instructions
            </Link></li>
            <li><Link to="/" className="Navls" onClick={() => this.handleLogout()}>
              Logout
            </Link></li>
        </header>
      );
    } else {
      return <div></div>;
    }
  }
}

const mapDispatchToProps = {
  logoutUser,
  getUser,
};

const mapStateToProps = (reduxState) => {
  const { user, isLoggedIn } = reduxState;
  return {
    user,
    isLoggedIn,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
