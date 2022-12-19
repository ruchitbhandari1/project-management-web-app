import React from "react";
import Organizations from "./Organizations";
import Projects from "./Projects";
import Settings from "./Settings";

function Sidebar() {
  return (
    <div className="flex flex-col w-1/6 bg-white">
      <div className="mb-auto">
        <Organizations />
        <Projects />
      </div>
      <Settings />
    </div>
  );
}

export default Sidebar;
