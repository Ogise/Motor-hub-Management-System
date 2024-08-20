import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Sales.css'; // Import the CSS file for styling

function Sales() {
    const [sales, setSales] = useState([]);
    const [newSale, setNewSale] = useState({ customerName: '', amount: '', date: '' });
    const [filterDate, setFilterDate] = useState('');

    // Define fetchSales using useCallback to ensure it is memoized
    const fetchSales = useCallback(() => {
        const url = filterDate ? `/api/sales?date=${filterDate}` : '/api/sales';
        axios.get(url)
            .then(response => setSales(response.data))
            .catch(error => console.error('Error fetching sales:', error));
    }, [filterDate]);

    useEffect(() => {
        fetchSales();
    }, [fetchSales]);

    const handleAddSale = () => {
        axios.post('/api/sales', newSale)
            .then(() => {
                fetchSales();
                setNewSale({ customerName: '', amount: '', date: '' });
            })
            .catch(error => console.error('Error adding sale:', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSale(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="sales-container">
            <h2>Sales</h2>
            <div className="sales-form">
                <input
                    type="text"
                    name="customerName"
                    placeholder="Customer Name"
                    value={newSale.customerName}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={newSale.amount}
                    onChange={handleInputChange}
                />
                <input
                    type="date"
                    name="date"
                    value={newSale.date}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddSale}>Add Sale</button>
            </div>
            <div className="filter">
                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    placeholder="Filter by Date"
                />
            </div>
            <ul className="sales-list">
                {sales.map(sale => (
                    <li key={sale._id}>
                        {sale.customerName} - ${sale.amount} on {new Date(sale.date).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sales;
