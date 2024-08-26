import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/img/codderalogo.png'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-container-box1"> 
                    <img className="navbar-container-logo" src={logo} alt='logo' />
                </div>
                <div className="navbar-container-box2">
                    <Link to="/" className="navbar-logo">
                    Mock API Client
                    </Link>
                </div>
                <div className="navbar-container-box3"></div>

            </div>
        </nav>
    );
}

export default Navbar;
