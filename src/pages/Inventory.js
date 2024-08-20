import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventory.css'; // Import the CSS file for styling

function Inventory() {
    const [motorcycles, setMotorcycles] = useState([]);
    const [newMotorcycle, setNewMotorcycle] = useState({ make: '', model: '', price: '' });

    useEffect(() => {
        fetchMotorcycles();
    }, []);

    const fetchMotorcycles = () => {
        axios.get('/api/inventory')
            .then(response => setMotorcycles(response.data))
            .catch(error => console.error('Error fetching inventory:', error));
    };

    const handleAddMotorcycle = () => {
        axios.post('/api/inventory', newMotorcycle)
            .then(() => {
                fetchMotorcycles();
                setNewMotorcycle({ make: '', model: '', price: '' });
            })
            .catch(error => console.error('Error adding motorcycle:', error));
    };

    const handleDeleteMotorcycle = (id) => {
        axios.delete(`/api/inventory/${id}`)
            .then(() => fetchMotorcycles())
            .catch(error => console.error('Error deleting motorcycle:', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMotorcycle(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="inventory-container">
            <h2>Inventory</h2>
            <div className="inventory-form">
                <input
                    type="text"
                    name="make"
                    placeholder="Make"
                    value={newMotorcycle.make}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="model"
                    placeholder="Model"
                    value={newMotorcycle.model}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newMotorcycle.price}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddMotorcycle}>Add Motorcycle</button>
            </div>
            <ul className="inventory-list">
                {motorcycles.map(motorcycle => (
                    <li key={motorcycle._id}>
                        {motorcycle.make} {motorcycle.model} - ${motorcycle.price}
                        <button onClick={() => handleDeleteMotorcycle(motorcycle._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Inventory;
