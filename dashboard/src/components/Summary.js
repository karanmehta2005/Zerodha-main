import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AIChatBot from "./AIChatBot";
import "./Summary.css";

const Summary = () => {
    const [allHoldings, setAllHoldings] = useState([]);

    useEffect(() => {
        axios.get("/allHoldings").then((res) => {
            setAllHoldings(res.data);
        });
    }, []);

    const currentValue = allHoldings.reduce((acc, stock) => acc + (stock.price * stock.qty), 0);

    return (
        <div className="summary-container">
            {/* Top Actions - Search Removed */}
            <div className="summary-header">
                <div className="icon-products">
                    <img src="logo.png" style={{ width: "24px", opacity: 0.6 }} alt="Products" />
                </div>
                <div className="profile-btn">
                    <div className="avatar-sm">Profile</div>
                </div>
            </div>

            {/* Product Nav - EXCLUDING Loans, IPO, Insurance */}
            <div className="product-nav">
                <div className="nav-item active">Stock Discovery</div>
            </div>

            {/* Markets Today */}
            <div className="markets-section">
                <div className="section-header">
                    <h4>Markets Today</h4>
                    <Link to="/markets" className="view-all">View All &gt;</Link>
                </div>
                <div className="market-cards">
                    <div className="market-card">
                        <div className="market-row">
                            <span className="name">SENSEX</span>
                            <span className="price down">76,847.57 ▼</span>
                        </div>
                        <span className="market-expiry">Expiry Thu</span>
                        <p className="market-change">-702.68 (-0.91%)</p>
                    </div>
                    <div className="market-card">
                        <div className="market-row">
                            <span className="name">NIFTY 50</span>
                            <span className="price down">23,398.90 ▼</span>
                        </div>
                        <span className="market-expiry">Expiry Tue</span>
                        <p className="market-change">-207.00 (-0.88%)</p>
                    </div>
                </div>
            </div>

            {/* Repositioned AI Assistant - Hero Mode */}
            <AIChatBot />

            {/* Promo Section */}
            <div className="promo-section">
                <div className="loan-card">
                    <div className="loan-info">
                        <h5>Get a loan of upto ₹5 lakhs instantly!</h5>
                    </div>
                    <div className="loan-icon">
                        <AccountBalanceIcon sx={{ fontSize: 40, color: '#4184f3' }} />
                    </div>
                </div>
            </div>

            {/* Utility Icons */}
            <div className="utilities-section">
                <div className="utility-item">
                    <div className="icon-circle">
                        <CardGiftcardIcon />
                        <span className="badge-dot">0</span>
                    </div>
                    <p>Rewards and Offers</p>
                </div>
                <div className="utility-item">
                    <div className="icon-circle">
                        <PersonAddAlt1Icon />
                    </div>
                    <p>Refer and Earn ₹2000</p>
                </div>
            </div>

            {/* Stocks You Are Interested In */}
            <div className="interest-section">
                <div className="section-header">
                    <h4>Stocks You Are Interested In</h4>
                </div>
                <div className="filter-pills">
                    <div className="pill">Last Viewed</div>
                </div>
                <div className="stock-grid">
                    <div className="stock-card">
                        <MoreVertIcon className="more-btn" fontSize="small" />
                        <div className="logo" style={{ color: '#ff6b6b' }}>HS</div>
                        <div className="symbol">HSCL</div>
                        <div className="price-row">
                            <span className="price down">₹470.55</span>
                        </div>
                        <div className="change">-0.35 (-0.07%)</div>
                    </div>
                    <div className="stock-card">
                        <MoreVertIcon className="more-btn" fontSize="small" />
                        <div className="logo" style={{ color: '#4184f3' }}>BA</div>
                        <div className="symbol">BAJAJ-AUTO</div>
                        <div className="price-row">
                            <span className="price up">₹9,816.00</span>
                        </div>
                        <div className="change">+2.50 (+0.03%)</div>
                    </div>
                    <div className="stock-card">
                        <MoreVertIcon className="more-btn" fontSize="small" />
                        <div className="logo" style={{ color: '#52b788' }}>RE</div>
                        <div className="symbol">RELIANCE</div>
                        <div className="price-row">
                            <span className="price up">₹2,112.40</span>
                        </div>
                        <div className="change">+14.50 (+0.69%)</div>
                    </div>
                    <div className="stock-card">
                        <MoreVertIcon className="more-btn" fontSize="small" />
                        <div className="logo" style={{ color: '#6d597a' }}>TC</div>
                        <div className="symbol">TCS</div>
                        <div className="price-row">
                            <span className="price down">₹3,194.80</span>
                        </div>
                        <div className="change">-22.30 (-0.69%)</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Summary;
