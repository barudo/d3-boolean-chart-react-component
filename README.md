# D3 Chart with Boolean Data in a React Component

## Project Description

This repository now includes a working React + D3 implementation of a boolean time-series chart.

The chart accepts multiple boolean series via props and renders a shared time-based X axis with one row per series. Short `true` segments can be padded to a minimum width when needed. Plot styling can be adjusted through the chart `settings` prop.

The example app loads sample boolean data from `src/example-data.json`.

## Included Files

- `package.json` — project dependencies and scripts.
- `vite.config.js` — Vite configuration for React.
- `src/components/BooleanTimelineChart.jsx` — D3-powered boolean timeline chart component.
- `src/App.jsx` — sample usage with example data.
- `src/example-data.json` — imported boolean time-series sample data.
- `index.html` — root HTML entry point.

## Usage

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Settings

Set the active plot color with `settings.plotColor`. The center line and thicker `true` segments use this color.

```jsx
<BooleanTimelineChart
  series={booleanSeries}
  startTime={exampleData.time.startTime}
  sampleIntervalS={exampleData.time.sampleIntervalS}
  settings={{ plotColor: "#ff1a12", plotLineWidth: 8 }}
/>
```

## Verification

The app renders a chart with boolean rows and a shared time axis. Each row has a configured-color center line with thicker `true` ranges drawn on top.

## Notes

The original `attachments/example-data.json` was copied into `src/example-data.json` in valid JSON form for direct import by the app.
