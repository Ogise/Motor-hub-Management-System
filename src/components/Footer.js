import React from 'react';

function Footer() {
    return (
        <footer style={footerStyle}>
            <p>Moto-Hub &copy; 2024</p>
        </footer>
    );
}

const footerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px',
    position: 'fixed',
    bottom: '0',
    width: '100%'
};

export default Footer;
