import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const StackedBarChart = () => {
  const svgRef = useRef();

  const data = [
    [17, 17, 16, 17, 17, 16],
    [17, 17, 16, 17, 17, 16],
    [17, 15, 18, 17, 17, 16],
    [17, 19, 14, 17, 17, 16],
    [17, 23, 10, 17, 17, 16],
  ];
  
  const keys = ["CP", "ENB", "CNR", "RY", "TD", "BAM-A"];

  useEffect(() => {
    const width = 500, height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    // 堆疊數據
    const stackedData = d3.stack().keys(d3.range(6))(data);

    // xScale 以計算次數為基礎，對應到每一列的索引
    const xScale = d3.scaleBand()
      .domain(d3.range(data.length)) // 每一列對應一個計算次數
      .range([margin.left, width - margin.right])
      .padding(0.3);

    // yScale 映射到資金分配比例（數值範圍）
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d3.sum(d))]) // 最大值設為每列的總和
      .nice()
      .range([height - margin.bottom, margin.top]);

    // 顏色設置
    const color = d3.scaleOrdinal(d3.schemePastel1);
        
    // 設置SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // 清除已有的圖形
    svg.selectAll("*").remove();

    // 添加堆疊條形
    const group = svg.append("g");

    group.selectAll("g")
      .data(stackedData)
      .enter().append("g")
      .attr("fill", (d, i) => color(i)) // 使用顏色
      .selectAll("rect")
      .data(d => d)
      .enter().append("rect")
      .attr("x", (d, i) => xScale(i)) // 每個條形的x位置對應於索引
      .attr("y", d => yScale(d[1])) // 設置每個條形的y位置
      .attr("height", d => yScale(d[0]) - yScale(d[1])) // 設置每個條形的高度
      .attr("width", xScale.bandwidth()) // 設置每個條形的寬度
      .transition()
      .duration(1000)
      .attr("opacity", 1);

    // x 軸和 y 軸
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat(i => `計算次數 ${i + 1}`)); // 顯示計算次數

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).tickFormat(d3.format(".2f"))); // 顯示資金分配比例
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default StackedBarChart;
