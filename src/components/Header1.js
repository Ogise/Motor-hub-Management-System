import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header style={headerStyle}>
            <h1>Moto-Hub Management System</h1>
            <nav>
                <ul style={navStyle}>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/inventory">Inventory</Link></li>
                    <li><Link to="/sales">Sales</Link></li>
                    <li><Link to="/customers">Customers</Link></li>
                </ul>
            </nav>
        </header>
    );
}

const headerStyle = {
    background: '#333',
    color: '#fff',
    padding: '10px',
    textAlign: 'center'
};

const navStyle = {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '0'
};

export default Header;
