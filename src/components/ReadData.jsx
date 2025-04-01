import React from 'react';

function ReadData({ setStockData }) {
  // 處理讀取 JSON 檔案
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // 讀取選擇的檔案
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = JSON.parse(e.target.result); // 解析 JSON
      setStockData(data); // 設定資料
    };

    reader.readAsText(file); // 讀取檔案為文本
  };

  return (
    <>
      {/* 使用原生 HTML input 元素來上傳 JSON 檔案 */}
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload} // 使用 handleFileUpload 處理檔案
      />
    </>
  );
}

export default ReadData;
