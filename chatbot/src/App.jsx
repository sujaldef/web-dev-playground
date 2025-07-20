import React from "react";
import "./styles/tailwind-pre-build.css";
import Navbar from "./components/Navbar";
import LivePortal from "./components/LivePortal";
import WorkContainer from "./components/WorkContainer";
import HomePage from "./components/Homepage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Papercut background component
const PaperCutBackground = () => (
  <div className="relative w-full h-screen bg-white overflow-hidden">
    {/* Top wave layer */}
    <div className="absolute top-0 left-0 w-full">
      <svg viewBox="0 0 1440 320" className="w-full h-48">
        <path
          fill="#2a61d4"
          d="M0,192L80,170.7C160,149,320,107,480,117.3C640,128,800,192,960,197.3C1120,203,1280,149,1360,122.7L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
      </svg>
    </div>

    {/* Middle wave layer */}
    <div className="absolute top-20 left-0 w-full">
      <svg viewBox="0 0 1440 320" className="w-full h-48">
        <path
          fill="#5695f0"
          d="M0,96L80,90.7C160,85,320,75,480,96C640,117,800,171,960,176C1120,181,1280,139,1360,117.3L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
      </svg>
    </div>

    {/* Bottom wave layer */}
    <div className="absolute top-40 left-0 w-full">
      <svg viewBox="0 0 1440 320" className="w-full h-48">
        <path
          fill="#94c2ff"
          d="M0,64L80,74.7C160,85,320,107,480,117.3C640,128,800,128,960,122.7C1120,117,1280,107,1360,101.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
    </div>

    {/* Text */}
    <div className="absolute bottom-10 right-10">
      <h1 className="text-4xl font-bold text-blue-800 tracking-wider">
        PAPER<span className="text-blue-400">CUT</span>
      </h1>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <PaperCutBackground />
            <HomePage />
          </Route>
          <Route path="/liveportal" component={LivePortal} />
          <Route path="/workcontainer" component={WorkContainer} />
        </Switch>
      </div>
    </Router>
  );
}
