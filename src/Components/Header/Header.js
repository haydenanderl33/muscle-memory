import "./Header.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, setUser } from "../../redux/reducer";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const Header = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);



  const history = useHistory();

  const { setUser } = props;
  const userName = sessionStorage.getItem("username");

  const handleLogout = () => {
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("username", "");
    const user = {};
    setUser(user);
    history.push("/");
  };



  return (
    <>
      <header style={{
          height: menuOpen > 0 ? '200px' : '90px',
          
        }}>
        <div className="header-wrapper">
          <div>
            <h1>Muscle Memory</h1>
          </div>
          <div>
            <h2>{userName}</h2>
          </div>
          <nav>
            <Link to="/home">Home</Link>
            <Link to="/addnew">Add Workout</Link>
            <Link to="/goals">Goals</Link>
            <button onClick={handleLogout}>Logout</button>
          </nav>
        </div>
        <div className="header-wrapper-mobile">
          <div>
            <h1>Muscle Memory</h1>
          </div>
          <div>
            <h2>{userName}</h2>
          </div>

          {menuOpen ? (
            <nav>
              <Link to="/home">Home</Link>
              <Link to="/addnew">Add Workout</Link>
              <Link to="/goals">Goals</Link>
              <button onClick={handleLogout}>Logout</button>
            </nav>
          ) : (
            <div className="closedMenu" onClick={() => setMenuOpen(!menuOpen)}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </div>
      </header>
    </>
  );
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
