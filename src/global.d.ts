import React from "react";
import ReactDOM from "react-dom";

declare global{
  interface Window {
    React: typeof React
    ReactDom: typeof ReactDOM
  }
}

export {}