import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userLogin } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class LoginPanel extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  //Function which changes the fields as you type
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //Preventing default form submit action
  onSubmit(e) {
    e.preventDefault();

    const userInfo = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.userLogin(userInfo);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <div className="card mt-4">
                <div className="card-header bg-primary">
                  <h1 className="display-4 text-white text-center">Log In</h1>
                </div>
                <div className="card-body bg-light">
                  <p className="lead text-center text-dark">
                    Sign in to your account
                  </p>
                  <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      placeholder="Email address"
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                    />
                    <TextFieldGroup
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />
                    <input
                      type="submit"
                      className="btn btn-success btn-block mt-4"
                      value="Login"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginPanel.propTypes = {
  userLogin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { userLogin }
)(LoginPanel);
