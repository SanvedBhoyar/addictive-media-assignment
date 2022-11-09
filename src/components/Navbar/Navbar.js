import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <div className="navbar">
            <Link className='navbar__item' to={`/`}>Home</Link>
            <Link className='navbar__item' to={`/list`}>List Data</Link>
        </div>
    );
}

export default Navbar;