import React from 'react';
import { connect } from 'react-redux';
import { registerUser, loginUserSuccess } from '../actions/action';
import FormLogin from './FormLogin';
import $ from 'jquery';

import '../css/FormRegister.css';
import '../css/container.css';

class FormRegister extends React.Component {
  componentDidMount() {
    const authToken = localStorage.getItem('token');
    this.props.dispatch(loginUserSuccess(authToken));
  }
  handleSubmit(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    this.props.dispatch(registerUser(username, password));
  }

  handleLinkToSignIn() {
    console.log('clicking the signin link');
    $('#FrontPage-FromRegister').addClass('hidden');
    $('#id-front-page-register-login-button').removeClass('hidden');
    $('#FrontPage-FromLogin').removeClass('hidden');
    $('#id-front-page-register-login-button').addClass('hidden');
    $('#id-form-login-input-username').focus();
  }

  render() {
    return (
      <div className="container">
        <div className="FormRegister-container">
          <div className="FormRegister-container-border">
            <p className="register-form-title">Register</p>
            <form
              onSubmit={e => this.handleSubmit(e)}
              className="FormRegister-container-form"
            >
              <br />
              <p
                id="error-username-registration"
                className="class-error-username-registration hidden"
              />
              <br />
              <input
                id="input-registration-username"
                type="text"
                name="username"
                placeholder="Username"
                required
              />
              <br />
              <p
                id="error-password-registration"
                className="class-error-password-registration hidden"
              />
              <input
                id="input-registration-password"
                type="password"
                name="password"
                placeholder="Password (min. 10 char)"
                required
              />
              <br /> <br />
              <button>Register</button>
              <p
                id=""
                className="register-form-signin-link"
                onClick={() => this.handleLinkToSignIn()}
              >
                Do you have an Account? Click here.
              </p>
            </form>
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(FormRegister);
