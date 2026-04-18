import React, { useEffect, useRef, useContext } from "react";
import * as LightweightCharts from "lightweight-charts";

import GeneralContext from "./GeneralContext";
import CloseIcon from "@mui/icons-material/Close";
import "./StockChart.css";

const StockChart = ({ uid, price }) => {
  const chartContainerRef = useRef();
  const { closeChartWindow } = useContext(GeneralContext);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartOptions = {
        layout: {
            textColor: '#d1d4dc',
            background: { type: LightweightCharts.ColorType.Solid, color: '#131722' },
        },
        grid: {
            vertLines: { color: 'rgba(42, 46, 57, 0.5)' },
            horzLines: { color: 'rgba(42, 46, 57, 0.5)' },
        },
        crosshair: {
            mode: 0,
        },
        rightPriceScale: {
            borderColor: 'rgba(197, 203, 206, 0.8)',
        },
        timeScale: {
            borderColor: 'rgba(197, 203, 206, 0.8)',
            timeVisible: true,
            secondsVisible: false,
        },
    };

    const chart = LightweightCharts.createChart(chartContainerRef.current, {
        ...chartOptions,
        width: chartContainerRef.current.clientWidth,
        height: 400,
    });

    const candlestickSeries = chart.addSeries(LightweightCharts.CandlestickSeries, {
        upColor: '#26a69a', 
        downColor: '#ef5350', 
        borderVisible: false,
        wickUpColor: '#26a69a', 
        wickDownColor: '#ef5350',
    });

    const volumeSeries = chart.addSeries(LightweightCharts.HistogramSeries, {
        color: '#26a69a',
        priceFormat: {
            type: 'volume',
        },
        priceScaleId: '', 
    });

    volumeSeries.priceScale().applyOptions({
        scaleMargins: {
            top: 0.8, 
            bottom: 0,
        },
    });

    const generateData = () => {
        const data = [];
        const volumeData = [];
        let curr = price || 100;
        const now = new Date();
        
        for (let i = 0; i < 100; i++) {
            const time = new Date(now.getTime() - (100 - i) * 24 * 60 * 60 * 1000);
            const open = curr + (Math.random() - 0.5) * (curr * 0.02);
            const close = open + (Math.random() - 0.5) * (curr * 0.02);
            const high = Math.max(open, close) + Math.random() * (curr * 0.01);
            const low = Math.min(open, close) - Math.random() * (curr * 0.01);
            
            const item = {
                time: time.toISOString().split('T')[0],
                open: parseFloat(open.toFixed(2)),
                high: parseFloat(high.toFixed(2)),
                low: parseFloat(low.toFixed(2)),
                close: parseFloat(close.toFixed(2)),
            };
            data.push(item);

            volumeData.push({
                time: item.time,
                value: Math.floor(Math.random() * 1000000),
                color: close >= open ? 'rgba(38, 166, 154, 0.5)' : 'rgba(239, 83, 80, 0.5)',
            });

            curr = close;
        }
        return { data, volumeData };
    };

    const { data: ohlcData, volumeData } = generateData();
    candlestickSeries.setData(ohlcData);
    volumeSeries.setData(volumeData);

    chart.timeScale().fitContent();

    const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
    };
  }, [uid, price]);

  return (
    <div className="chart-overlay">
        <div className="chart-window dark-theme">
            <div className="window-header">
                <h4>{uid} Performance Chart</h4>
                <button onClick={closeChartWindow} className="close-btn">
                    <CloseIcon fontSize="small" />
                </button>
            </div>
            <div className="chart-container-wrapper" ref={chartContainerRef} style={{ background: '#131722', height: '400px', width: '100%' }}>
            </div>
        </div>
    </div>
  );
};

export default StockChart;
