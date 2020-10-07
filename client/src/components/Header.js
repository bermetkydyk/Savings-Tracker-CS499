import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper green lighten-3">
                <a href="#!" className="brand-logo"><i className="material-icons"></i>COIN</a>
                    <ul className="right hide-on-med-and-down">
                        <li><a className="waves-effect waves-light btn-large">Login With Google</a></li>
                    </ul>
                </div>
          </nav>
        );
    }
}

export default Header;