# D3 Chart with Boolean Data in a React Component

## Project Description

This repository now includes a working React + D3 implementation of a boolean time-series chart.

The chart accepts multiple boolean series via props and renders a shared time-based X axis with one row per series. Short `true` segments are padded to a minimum width to ensure visibility.

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

## Verification

The app renders a chart with boolean rows and a shared time axis. Each `true` range uses a colored segment and a minimum width of 20px.

## Notes

The original `attachments/example-data.json` was copied into `src/example-data.json` in valid JSON form for direct import by the app.
