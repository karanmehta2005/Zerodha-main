import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";
import StockChart from "./StockChart";
import StockSIP from "./StockSIP";
import StockDetails from "./StockDetails";


const GeneralContext = React.createContext({
  openBuyWindow: (uid, price) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid, price) => {},
  closeSellWindow: () => {},
  openChartWindow: (uid, price) => {},
  closeChartWindow: () => {},
  openSIPWindow: (uid, price) => {},
  closeSIPWindow: () => {},

  openDetailsWindow: (uid) => {},
  closeDetailsWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [isChartWindowOpen, setIsChartWindowOpen] = useState(false);
  const [isSIPWindowOpen, setIsSIPWindowOpen] = useState(false);
  const [isDetailsWindowOpen, setIsDetailsWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");

  const [selectedStockPrice, setSelectedStockPrice] = useState(0);

  const handleOpenBuyWindow = (uid, price) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
    setSelectedStockPrice(price);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setSelectedStockPrice(0);
  };

  const handleOpenSellWindow = (uid, price) => {
    setIsSellWindowOpen(true);
    setSelectedStockUID(uid);
    setSelectedStockPrice(price);
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
    setSelectedStockPrice(0);
  };

  const handleOpenChartWindow = (uid, price) => {
    setIsChartWindowOpen(true);
    setSelectedStockUID(uid);
    setSelectedStockPrice(price);
  };


  const handleCloseChartWindow = () => {
    setIsChartWindowOpen(false);
    setSelectedStockUID("");
  };

  const handleOpenSIPWindow = (uid, price) => {
    setIsSIPWindowOpen(true);
    setSelectedStockUID(uid);
    setSelectedStockPrice(price);
  };

  const handleCloseSIPWindow = () => {
    setIsSIPWindowOpen(false);
    setSelectedStockUID("");
  };

  const handleOpenDetailsWindow = (uid) => {
    setIsDetailsWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseDetailsWindow = () => {
    setIsDetailsWindowOpen(false);
    setSelectedStockUID("");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
        openChartWindow: handleOpenChartWindow,
        closeChartWindow: handleCloseChartWindow,
        openSIPWindow: handleOpenSIPWindow,
        closeSIPWindow: handleCloseSIPWindow,
        openDetailsWindow: handleOpenDetailsWindow,
        closeDetailsWindow: handleCloseDetailsWindow,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} price={selectedStockPrice} />}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID} price={selectedStockPrice} />}
      {isChartWindowOpen && <StockChart uid={selectedStockUID} price={selectedStockPrice} />}
      {isSIPWindowOpen && <StockSIP uid={selectedStockUID} price={selectedStockPrice} />}
      {isDetailsWindowOpen && <StockDetails uid={selectedStockUID} />}

    </GeneralContext.Provider>

  );
};


export default GeneralContext;
