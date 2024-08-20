import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import './Dashboard.css'; // Import the CSS file for styling

function Dashboard() {
    const [totalMotorcycles, setTotalMotorcycles] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);

    useEffect(() => {
        axios.get('/api/inventory/count')
            .then(response => setTotalMotorcycles(response.data.count))
            .catch(error => console.error('Error fetching motorcycle count:', error));

        axios.get('/api/sales/total')
            .then(response => setTotalSales(response.data.total))
            .catch(error => console.error('Error fetching total sales:', error));

        axios.get('/api/customers/count')
            .then(response => setTotalCustomers(response.data.count))
            .catch(error => console.error('Error fetching customer count:', error));
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <div className="dashboard-widgets">
                <div className="widget">
                    <h3>Total Motorcycles</h3>
                    <p>{totalMotorcycles}</p>
                </div>
                <div className="widget">
                    <h3>Total Sales</h3>
                    <p>${totalSales}</p>
                </div>
                <div className="widget">
                    <h3>Total Customers</h3>
                    <p>{totalCustomers}</p>
                </div>
            </div>
            <div className="slideshow-container">
                <Slider {...sliderSettings}>
                    <div>
                        <img src="https://via.placeholder.com/800x400?text=Slide+1" alt="Slide 1" />
                        <p>Slide 1 Description</p>
                    </div>
                    <div>
                        <img src="https://via.placeholder.com/800x400?text=Slide+2" alt="Slide 2" />
                        <p>Slide 2 Description</p>
                    </div>
                    <div>
                        <img src="https://via.placeholder.com/800x400?text=Slide+3" alt="Slide 3" />
                        <p>Slide 3 Description</p>
                    </div>
                </Slider>
            </div>
        </div>
    );
}

export default Dashboard;
