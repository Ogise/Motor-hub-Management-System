import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Customers.css'; // Import the CSS file for styling

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        axios.get('/api/customers')
            .then(response => setCustomers(response.data))
            .catch(error => console.error('Error fetching customers:', error));
    };

    const handleAddCustomer = () => {
        axios.post('/api/customers', newCustomer)
            .then(() => {
                fetchCustomers();
                setNewCustomer({ name: '', email: '', phone: '' });
            })
            .catch(error => console.error('Error adding customer:', error));
    };

    const handleDeleteCustomer = (id) => {
        axios.delete(`/api/customers/${id}`)
            .then(() => fetchCustomers())
            .catch(error => console.error('Error deleting customer:', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="customers-container">
            <h2>Customers</h2>
            <div className="customers-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newCustomer.name}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newCustomer.email}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={newCustomer.phone}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddCustomer}>Add Customer</button>
            </div>
            <ul className="customers-list">
                {customers.map(customer => (
                    <li key={customer._id}>
                        {customer.name} - {customer.email} - {customer.phone}
                        <button onClick={() => handleDeleteCustomer(customer._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Customers;
