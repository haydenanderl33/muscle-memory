import "./Header.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, getUser } from "../../redux/reducer";
import {useEffect} from 'react'
import axios from "axios";

const Header = (props) => {
  const {getUser}= props
  useEffect(() => {
    const getInstructions = async () => {
      try {
        const user = await getUser();
        console.log(user)
      }
      catch (err) {
        console.log(err)
      }
    };
    getInstructions();
  
  }, [getUser]);

    const handleLogout = () => {
    axios.post("/auth/logout");
    props.logoutUser();
  };

  if (props.location.pathname !== "/") {
          return (
            <header>
               {/* {console.log(props)} */}
              <h2 className="logo">Muscle Memory</h2>
          <h3 className="username">{props.user.username}</h3>
              
                <li><Link to="/home" className="Navls">
                  Home
                </Link></li>
                <li><Link to="/addnew" className="Navls">
                  AddNew
                </Link></li>
                <li><Link to="/instructions" className="Navls">
                  Instructions
                </Link></li>
                <li><Link to="/goals" className="Navls">
                  Goals
                </Link></li>
                <li><Link to="/" className="Navls" onClick={() => handleLogout()}>
                  Logout
                </Link></li>
            </header>
          );
        } else {
          return <div></div>;
        }
}



const mapDispatchToProps = {
  logoutUser,
    getUser,
};

const mapStateToProps = (reduxState) => {
  const { user, isLoggedIn } = reduxState.userReducer;
  const {metGoals} = reduxState.goalReducer
  return {
    user,
    isLoggedIn,
    metGoals
  };
  // console.log(reduxState)
  // return reduxState
  
};




export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));













// import "./Header.css";
// import React, { Component } from "react";
// import { Link, withRouter } from "react-router-dom";
// import { connect } from "react-redux";
// import { logoutUser, getUser } from "../../redux/reducer";
// import axios from "axios";

// class Header extends Component {
//   constructor() {
//     super();
//   }

//   componentDidMount() {
//     this.props.getUser();
//   }

//   handleLogout = () => {
//     axios.post("/auth/logout");
//     this.props.logoutUser();
//   };

//   render() {
//     const { username } = this.props.user;
//     if (this.props.location.pathname !== "/") {
//       return (
//         <header>
//           <h2 className="logo">Muscle Memory</h2>
//           <h3 className="username">{username}</h3>
          
//             <li><Link to="/home" className="Navls">
//               Home
//             </Link></li>
//             <li><Link to="/addnew" className="Navls">
//               AddNew
//             </Link></li>
//             <li><Link to="/instructions" className="Navls">
//               Instructions
//             </Link></li>
//             <li><Link to="/" className="Navls" onClick={() => this.handleLogout()}>
//               Logout
//             </Link></li>
//         </header>
//       );
//     } else {
//       return <div></div>;
//     }
//   }
// }

// const mapDispatchToProps = {
//   logoutUser,
//   getUser,
// };

// const mapStateToProps = (reduxState) => {
//   const { user, isLoggedIn } = reduxState;
//   return {
//     user,
//     isLoggedIn,
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
