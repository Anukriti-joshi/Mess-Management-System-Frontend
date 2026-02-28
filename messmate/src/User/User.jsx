import React from "react";
import Sidebar from "./Components/Sidebar";
import Mainbar from "./Components/Mainbar";

function User() {
  return (
    <div className="h-screen w-screen overflow-hidden flex">
      {/* Fixed Sidebar */}
      <aside className="h-screen flex-shrink-0 overflow-y-auto shadow-2xl">
        <Sidebar />
      </aside>

      {/* Scrollable Main Content */}
      <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden bg-gray-100 p-4">
        <Mainbar />
      </main>
    </div>
  );
}

export default User;
