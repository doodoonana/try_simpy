import React, { useState } from 'react';
import ReadData from './ReadData'; 

function Information() {
  const [stockData, setStockData] = useState(null); // 在 Information 內部管理狀態

  return (
    <>
      <h1>股票資訊顯示</h1>
      <ReadData setStockData={setStockData} /> {/* 傳遞狀態更新函數 */}

      {stockData && (
        <div>
          <h2>股票數量: {stockData.numStocks}</h2>
          <h3>成分股:</h3>
          <ul>
            {stockData.stocks.map((stock, index) => (
              <li key={index}>{stock}</li>
            ))}
          </ul>

          <h3>Data Weights:</h3>
          <ul>
            {stockData.data.map((item, index) => (
              <li key={index}>
                <p>計算次數 {index + 1} - Weights: {item.weights.join(', ')}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Information;
