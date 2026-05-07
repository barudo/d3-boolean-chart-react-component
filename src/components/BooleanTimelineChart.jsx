import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function BooleanTimelineChart({
  series = [],
  startTime,
  sampleIntervalS = 1,
  minSegmentWidth = 20,
  settings = {},
  width = 900,
  margin = { top: 20, right: 20, bottom: 32, left: 140 },
}) {
  const svgRef = useRef(null);
  const plotColor = settings.plotColor || "#ff1a12";
  const plotLineWidth = settings.plotLineWidth || 8;

  useEffect(() => {
    if (!series.length || !startTime) return;

    const svg = d3.select(svgRef.current);
    const innerWidth = width - margin.left - margin.right;
    const rowHeight = 36;
    const rowGap = 10;
    const height = series.length * rowHeight + (series.length - 1) * rowGap;
    const start = new Date(startTime);
    const pointCount = series[0]?.values?.length || 0;
    const sampleTimes = d3
      .range(pointCount)
      .map(
        (index) => new Date(start.getTime() + index * sampleIntervalS * 1000),
      );
    const endTime = new Date(
      start.getTime() + pointCount * sampleIntervalS * 1000,
    );

    svg.attr("viewBox", [0, 0, width, height + margin.top + margin.bottom]);
    svg.selectAll("*").remove();

    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleTime()
      .domain([start, endTime])
      .range([0, innerWidth]);

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(Math.min(pointCount, 8))
      .tickFormat(d3.timeFormat("%H:%M:%S"));

    chartGroup
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .selectAll("text")
      .attr("font-size", 11);

    const band = d3
      .scaleBand()
      .domain(series.map((_, index) => index))
      .range([0, height])
      .paddingInner(0.3)
      .paddingOuter(0.1);

    const rowGroup = chartGroup.append("g");

    series.forEach((serie, index) => {
      const y = band(index);
      if (y === undefined) return;

      rowGroup
        .append("rect")
        .attr("x", 0)
        .attr("y", y)
        .attr("width", innerWidth)
        .attr("height", band.bandwidth())
        .attr("fill", index % 2 === 0 ? "#f8f9fb" : "#eef1f6");

      rowGroup
        .append("text")
        .attr("x", -12)
        .attr("y", y + band.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "end")
        .attr("font-size", 12)
        .attr("fill", "#2f3a4a")
        .text(serie.label);

      const runs = [];
      let runStart = null;

      serie.values.forEach((value, sampleIndex) => {
        if (value) {
          if (runStart === null) runStart = sampleIndex;
        } else if (runStart !== null) {
          runs.push([runStart, sampleIndex - 1]);
          runStart = null;
        }
      });

      if (runStart !== null) {
        runs.push([runStart, serie.values.length - 1]);
      }

      const innerBarHeight = Math.max(band.bandwidth() * 0.5, 14);
      const yRow = y + (band.bandwidth() - innerBarHeight) / 2;
      const yCenter = y + band.bandwidth() / 2;

      rowGroup
        .append("line")
        .attr("x1", 0)
        .attr("x2", innerWidth)
        .attr("y1", yCenter)
        .attr("y2", yCenter)
        .attr("stroke", plotColor)
        .attr("stroke-width", plotLineWidth)
        .attr("stroke-linecap", "butt");

      rowGroup
        .selectAll(`rect.run-${index}`)
        .data(runs)
        .join("rect")
        .attr("x", ([from]) => xScale(sampleTimes[from]))
        .attr("y", yRow)
        .attr("width", ([from, to]) => {
          const startX = xScale(sampleTimes[from]);
          const endX = xScale(
            new Date(start.getTime() + (to + 1) * sampleIntervalS * 1000),
          );
          return Math.max(endX - startX, minSegmentWidth);
        })
        .attr("height", innerBarHeight)
        .attr("fill", plotColor)
        .attr("rx", 4);
    });
  }, [
    series,
    startTime,
    sampleIntervalS,
    minSegmentWidth,
    plotColor,
    plotLineWidth,
    width,
    margin,
  ]);

  return (
    <div style={{ overflowX: "auto" }}>
      <svg ref={svgRef} style={{ width: "100%", height: "auto" }} />
    </div>
  );
}

export default BooleanTimelineChart;
