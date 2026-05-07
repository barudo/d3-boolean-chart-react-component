import React from "react";
import BooleanTimelineChart from "./components/BooleanTimelineChart.jsx";
import exampleData from "./example-data.json";

const booleanSeries = exampleData.labels.slice(1).map((label, index) => ({
  label,
  values: exampleData.samples.map((sample) => Boolean(sample[index + 1])),
}));

function App() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>D3 Boolean Timeline Chart</h1>
      <p>
        This example renders a shared time-based X axis with multiple boolean
        series. Each row uses a center line with thicker <strong>true</strong>
        segments drawn on top.
      </p>
      <BooleanTimelineChart
        series={booleanSeries}
        startTime={exampleData.time.startTime}
        sampleIntervalS={exampleData.time.sampleIntervalS}
        minSegmentWidth={0}
        settings={{ plotColor: "#ff1a12", plotLineWidth: 8 }}
        width={980}
      />
      <p style={{ marginTop: 18, fontSize: 14, color: "#555" }}>
        The chart uses data extracted from <code>src/example-data.json</code>.
      </p>
    </div>
  );
}

export default App;
