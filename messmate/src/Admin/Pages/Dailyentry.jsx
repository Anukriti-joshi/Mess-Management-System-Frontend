import React, { useState } from "react";
import AllPlanTable from "./AllPlanTable";
import TodayStudent from "./TodayStudent";

const Dailyentry = () => {
  const [isSetAll, setIsSetAll] = useState(true);

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Tab Header */}
      <div className="flex items-center justify-center gap-8 p-4 border-b bg-gray-50 rounded-t-lg">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="tab_selection"
            checked={isSetAll}
            onChange={() => setIsSetAll(true)}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-lg font-medium">All Plans</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="tab_selection"
            checked={!isSetAll}
            onChange={() => setIsSetAll(false)}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-lg font-medium">Today's Students</span>
        </label>
      </div>

      {/* Content */}
      <div className="p-4">
        {isSetAll ? <AllPlanTable /> : <TodayStudent />}
      </div>
    </div>
  );
};

export default Dailyentry;
