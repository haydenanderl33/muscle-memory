import "./Header.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, setUser } from "../../redux/reducer";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  const [toggle, setToggle] = useState(false);

  const history = useHistory()

  const { setUser } = props;

  const handleLogout = () => {
    sessionStorage.setItem("token", "");
    const user = {};
    setUser(user);
    history.push("/")
  };

  if (window.location !== "/") {
    return (
      <header>
        <h2 className="logo">Muscle Memory</h2>
        <h3 className="username">{props.user.username}</h3>
        {!toggle ? (
          <div>
            <div onClick={() => setToggle(!toggle)} className="menubtn">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <div>
            <div onClick={() => setToggle(!toggle)} className="menubtn">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="dropdownmenu">
              <div>
                <Link style={{ color: "#F76C5E" }} to="/home" className="Navls">
                  Home
                </Link>
              </div>
              <div>
                <Link
                  style={{ color: "#F76C5E" }}
                  to="/addnew"
                  className="Navls"
                >
                  AddNew
                </Link>
              </div>
              <div>
                <Link
                  style={{ color: "#F76C5E" }}
                  to="/instructions"
                  className="Navls"
                >
                  Instructions
                </Link>
              </div>
              <div>
                <Link
                  style={{ color: "#F76C5E" }}
                  to="/goals"
                  className="Navls"
                >
                  Goals
                </Link>
              </div>
              <div>
                <Link
                  style={{ color: "#F76C5E" }}
                  to="/"
                  className="Navls"
                  onClick={() => handleLogout()}
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        )}

        <li>
          <Link style={{ color: "white" }} to="/home" className="Navls">
            Home
          </Link>
        </li>
        <li>
          <Link style={{ color: "white" }} to="/addnew" className="Navls">
            AddNew
          </Link>
        </li>
        <li>
          <Link style={{ color: "white" }} to="/instructions" className="Navls">
            Instructions
          </Link>
        </li>
        <li>
          <Link style={{ color: "white" }} to="/goals" className="Navls">
            Goals
          </Link>
        </li>
        <li>
          <Link
            style={{ color: "white" }}
            to="/"
            className="Navls"
            onClick={() => handleLogout()}
          >
            Logout
          </Link>
        </li>
      </header>
    );
  } else {
    return <div></div>;
  }
};

const mapDispatchToProps = {
  logoutUser,
  setUser,
};

const mapStateToProps = (reduxState) => {
  const { user, isLoggedIn } = reduxState.userReducer;
  const { metGoals } = reduxState.goalReducer;
  return {
    user,
    isLoggedIn,
    metGoals,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
