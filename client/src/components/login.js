import React from 'react';
const axios = require('axios');
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.createAccount = this.createAccount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    };
  }
  handleChange(event) {
    let value;
    value = event.target.value;
    console.log(event.target, this.state);
    this.setState({
      [event.target.name]: [value],
    });
  }
  async createAccount(e) {
    e.preventDefault();
    await axios.post('/user/register', this.state);
  }
  async login(e) {
    e.preventDefault();
    await axios.post('/user/login', {
      email: this.state.email,
      password: this.state.password,
    });
  }
  render() {
    return (
      <div
        style={{ overflowY: 'scroll', height: '80%' }}
        className="main-content__wrapper -form"
      >
        <form
          method="POST"
          action="/user/register"
          className="form"
          onSubmit={this.createAccount}
        >
          <div className="form-wrapper">
            <label htmlFor="email">
              Email
              <input
                value={this.state.email}
                onChange={this.handleChange}
                type="email"
                name="email"
              />
            </label>
            <label htmlFor="username">
              Username
              <input
                value={this.state.username}
                onChange={this.handleChange}
                type="text"
                name="username"
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                name="password"
              />
            </label>
            <label htmlFor="password-confirm">
              Password Confirm
              <input
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                type="password"
                name="confirmPassword"
              />
            </label>
            <input className="button -primary" type="submit" />
          </div>
        </form>
        <form onSubmit="" method="POST" className="form" action="/user/login">
          <div className="form-wrapper">
            <label htmlFor="email">email</label>
            <input name="email" type="email" onChange={this.handleChange} />
            <label htmlFor="password">password</label>
            <input
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <input className="button -primary" type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
