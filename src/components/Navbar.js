import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../images/marvel.png';
import './Navbar.css';

const Navbar = ({ icon, title }) => {

    return (
    <div>
        <nav className="navbar navbar-expand-lg heading">
            <Link to='/' ><h3 className="heading"><img src={logo} alt="" /> {title} </h3></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                        <div className="nav-link dropdown-toggle heading" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span>{"    "}</span>API Queries
                        </div>
                        <div className="dropdown-menu heading" aria-labelledby="navbarDropdown">    
                            <Link to='/characters' className="dropdown-item"> Characters</Link>
                            {/* <a className="dropdown-item" href="javascript:void(0)">Character Search</a> */}
                            <Link to='/characters' className="dropdown-item"> More Queries Coming Soon!</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    )


}

Navbar.defaultProps = {
    title: 'Marvel API Browser',
    icon: 'far fa-hand-spock'
  }
  
  Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }

export default Navbar;