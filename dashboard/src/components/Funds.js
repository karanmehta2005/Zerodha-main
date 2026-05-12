import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';
import axios from "axios";
import "./Funds.css";

const Funds = () => {
    const [balance, setBalance] = useState(0);
    const [amountUsed, setAmountUsed] = useState(0);
    const [lastUpdated, setLastUpdated] = useState("");

    const [modal, setModal] = useState({ open: false, type: "" });
    const [amount, setAmount] = useState("");

    const fetchFunds = async () => {
        try {
            const userEmail = localStorage.getItem("userEmail") || "default";
            const res = await axios.get(`/userFunds?user=${userEmail}`);
            setBalance(res.data.funds);
            
            // Fetch holdings to calculate amount used
            const holdingsRes = await axios.get(`/allHoldings?user=${userEmail}`);
            const totalUsed = holdingsRes.data.reduce((acc, stock) => acc + (stock.avg * stock.qty), 0);
            setAmountUsed(totalUsed);

            const now = new Date();
            setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) + " on " + now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));
        } catch (err) {
            console.error("Error fetching funds:", err);
        }
    };

    useEffect(() => {
        fetchFunds();
    }, []);

    const handleTransaction = async () => {
        const val = parseFloat(amount);
        if (isNaN(val) || val <= 0) return;

        try {
            const userEmail = localStorage.getItem("userEmail") || "default";
            await axios.post("/updateFunds", {
                user: userEmail,
                amount: modal.type === "ADD" ? val : -val
            });
            fetchFunds();
        } catch (err) {
            console.error("Error updating funds:", err);
            alert(err.response?.data?.error || err.response?.data?.message || "Error processing transaction!");
        }
        setModal({ open: false, type: "" });
        setAmount("");
    };

    return (
        <div className="funds-container">
            {/* Header */}
            <div className="funds-header">
                <Link to="/" className="icon-btn"><ArrowBackIcon fontSize="small" /></Link>
                <h4>Trading Balance Summary</h4>
                <button className="icon-btn"><HelpOutlineIcon fontSize="small" /></button>
            </div>

            {/* Balance Hero */}
            <div className="funds-hero">
                <span className="label">Trading balance</span>
                <h2>₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                <div className="timestamp">
                    <HistoryIcon sx={{ fontSize: 14 }} />
                    Updated at {lastUpdated}
                </div>

                <div className="funds-actions">
                    <button className="funds-btn btn-withdraw" onClick={() => setModal({ open: true, type: "WITHDRAW" })}>Withdraw</button>
                    <button className="funds-btn btn-add" onClick={() => setModal({ open: true, type: "ADD" })}>Add Funds</button>
                </div>


            </div>

            {/* Detailed Stats */}
            <div className="funds-details">
                <div className="detail-group">
                    <div className="detail-item">
                        <span className="detail-label">Cash balance</span>
                        <span className="detail-value">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Margin from pledge</span>
                        <span className="detail-value">₹0.00</span>
                    </div>
                </div>

                <div className="detail-group">
                    <div className="detail-item">
                        <span className="detail-label">Amount Added</span>
                        <span className="detail-value positive">₹{(balance + amountUsed).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Free cash balance <InfoIcon className="info-icon" sx={{ fontSize: 16 }} /></span>
                        <span className="detail-value">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>

                <div className="detail-group">
                    <div className="detail-item">
                        <span className="detail-label" style={{ fontWeight: 700 }}>Amount Used (Holdings)</span>
                        <span className="detail-value negative">₹{amountUsed.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>
            </div>

            {/* Custom Modal for Add/Withdraw */}
            {modal.open && (
                <>
                    <div className="modal-overlay" onClick={() => setModal({ open: false, type: "" })} />
                    <div className="transaction-modal">
                        <h3>{modal.type === "ADD" ? "Add Funds" : "Withdraw Funds"}</h3>
                        <p>Enter amount in INR</p>
                        <input 
                            type="number" 
                            placeholder="₹0.00" 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} 
                            autoFocus
                        />
                        <div className="funds-actions">
                            <button className="funds-btn btn-withdraw" onClick={() => setModal({ open: false, type: "" })}>Cancel</button>
                            <button className="funds-btn btn-add" onClick={handleTransaction}>Confirm</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Funds;
