import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AIChatBot from "./AIChatBot";
import GeneralContext from "./GeneralContext";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import "./Summary.css";

const Summary = () => {
    const [allHoldings, setAllHoldings] = useState([]);
    const generalContext = React.useContext(GeneralContext);

    const interestedStocks = [
        { symbol: "HSCL", price: 470.55, change: "-0.35 (-0.07%)", isUp: false, color: "#ff6b6b", logo: "HS" },
        { symbol: "BAJAJ-AUTO", price: 9816.00, change: "+2.50 (+0.03%)", isUp: true, color: "#4184f3", logo: "BA" },
        { symbol: "RELIANCE", price: 2112.40, change: "+14.50 (+0.69%)", isUp: true, color: "#52b788", logo: "RE" },
        { symbol: "TCS", price: 3194.80, change: "-22.30 (-0.69%)", isUp: false, color: "#6d597a", logo: "TC" }
    ];

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
                    <img src={`${process.env.PUBLIC_URL}/logo.png`} style={{ width: "24px", opacity: 0.6 }} alt="Products" />
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
                    <div className="market-card">
                        <div className="market-row">
                            <span className="name">BANKNIFTY</span>
                            <span className="price up">49,850.40 ▲</span>
                        </div>
                        <span className="market-expiry">Expiry Wed</span>
                        <p className="market-change">+145.20 (+0.29%)</p>
                    </div>
                    <div className="market-card">
                        <div className="market-row">
                            <span className="name">NIFTY 100</span>
                            <span className="price down">24,105.20 ▼</span>
                        </div>
                        <span className="market-expiry">Expiry Thu</span>
                        <p className="market-change">-180.50 (-0.74%)</p>
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
                    {interestedStocks.map((stock, index) => (
                        <div className="stock-card" key={index}>
                            <MoreVertIcon className="more-btn" fontSize="small" />
                            <div className="logo" style={{ color: stock.color }}>{stock.logo}</div>
                            <div className="symbol">{stock.symbol}</div>
                            <div className="price-row">
                                <span className={`price ${stock.isUp ? 'up' : 'down'}`}>₹{stock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className="change">{stock.change}</div>

                            <div className="stock-card-actions">
                                <button className="stock-card-btn buy" onClick={() => generalContext.openBuyWindow(stock.symbol, stock.price)}>Buy</button>
                                <button className="stock-card-btn sell" onClick={() => generalContext.openSellWindow(stock.symbol, stock.price)}>Sell</button>
                                <button className="stock-card-btn chart" onClick={() => generalContext.openChartWindow(stock.symbol, stock.price)}>
                                    <BarChartOutlinedIcon fontSize="small" />
                                </button>
                                <button className="stock-card-btn more" onClick={() => generalContext.openSIPWindow(stock.symbol, stock.price)}>
                                    <MoreHorizIcon fontSize="small" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Summary;
