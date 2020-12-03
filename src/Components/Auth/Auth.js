import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { loginUser } from "../../redux/reducer";
import "./Auth.css";

class Auth extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      username: "",
      password: "",
      newUser: false,
    };
  }

  toggleNewUser = () => {
    this.setState({ newUser: !this.state.newUser });
  };

  changeHanderl = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  login = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const user = await axios.post("/auth/login", { email, password });
      this.props.loginUser(user.data);
      this.props.history.push("/home");
    } catch (err) {
      alert(err.response.request.response);
    }
  };
  register = async (e) => {
    e.preventDefault();
    const { email, username, password } = this.state;
    try {
      const user = await axios.post("/auth/register", {
        email,
        username,
        password,
      });
      this.props.loginUser(user.data);
      this.props.history.push("/home");
    } catch (err) {
      alert(err.response.request.response);
    }
  };

  render() {
    const { newUser, email, username, password } = this.state;
    return (
        <div className="authbox">
          {newUser ? (
            <div className="authitems">
              <h2>Muscle Memory</h2>
              <form className="loginbox" onSubmit={(e) => this.register(e)}>
                <input
                  name="email"
                  value={email}
                  placeholder="email"
                  onChange={(e) => this.changeHanderl(e)}
                />
                <input
                  name="username"
                  value={username}
                  placeholder="username"
                  onChange={(e) => this.changeHanderl(e)}
                />
                <input
                  name="password"
                  value={password}
                  placeholder="password"
                  onChange={(e) => this.changeHanderl(e)}
                />
                <button>Create Account</button>
              </form>
              <button onClick={() => this.toggleNewUser()}>
                Have an account?
              </button>
            </div>
          ) : (
            <div className="authitems">
              <h2>Muscle Memory</h2>
              <form className="loginbox" onSubmit={(e) => this.login(e)}>
                <input
                  name="email"
                  value={email}
                  placeholder="email"
                  onChange={(e) => this.changeHanderl(e)}
                />
                <input
                  name="password"
                  value={password}
                //   type="password"
                  placeholder="password"
                  onChange={(e) => this.changeHanderl(e)}
                />
                <button>Login</button>
              </form>
              <button onClick={() => this.toggleNewUser()}>
                Need an account?
              </button>
            </div>
          )}
        
      </div>
    );
  }
}

const mapDispatchToProps = {
  loginUser,
};

const mapStateToProps = (reduxState) => {
  const { user, isLoggedIn } = reduxState;
  return {
    user,
    isLoggedIn,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
