import React from 'react';
import { Link } from 'react-router-dom';

class HeaderComponent extends React.Component {
  render() {
    return (
      <header>
        <div className="header-wrapper">
          <h1>TItle Goes Here</h1>
          <nav className="header-wrapper__nav">
            <Link to="/">
              <p>Get Items</p>
            </Link>
            <Link to="/add">
              <p>Add Items</p>
            </Link>
            <Link to="/recipe">
              <p>Recipes</p>
            </Link>
          </nav>
          <div className="header-wrapper__account-area">
            <Link to="/account">
              <p>Account Page</p>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

export default HeaderComponent;
