import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
} from "recharts";

import axios from "../../Api/axios";

function Dashboad() {
  const COLORS = ["#005298", "#004e40", "#ff0000"];
  const COLORS1 = ["#005298", "#004e40", "#ff0000", "#cc8400", "#964b00"];
  const [data, setData] = useState(null);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/stats/getDayMember", {
          withCredentials: true,
        });
        setData(response.data);
      } catch (err) {}
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/stats/getPlanCount", {
          withCredentials: true,
        });
        setData1(response.data);
      } catch (err) {}
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/stats/getMonthlyExpenses", {
          withCredentials: true,
        });
        setData3(response.data);
      } catch (err) {}
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/stats/getWeekProfit", {
          withCredentials: true,
        });
        setData2(response.data);
      } catch (err) {}
    };
    getData();
  }, []);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-teal-600 border-b-2 border-gray-300 pb-2">
          DASHBOARD
        </h1>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Pie Chart 1 - Plan Distribution */}
        <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col sm:flex-row items-center justify-around min-h-[280px]">
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-lg">Plan Distribution</span>
            <div className="flex gap-2 items-center">
              <div className="w-4 h-4 bg-[#ff0000] rounded-full"></div>
              <span className="text-sm">Daily</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-4 h-4 bg-[#004e40] rounded-full"></div>
              <span className="text-sm">Weekly</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-4 h-4 bg-[#005298] rounded-full"></div>
              <span className="text-sm">Monthly</span>
            </div>
          </div>
          <div className="w-[200px] h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data1}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="count"
                  label
                >
                  {data1.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart 2 - Expenditure */}
        <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col sm:flex-row items-center justify-around min-h-[280px]">
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-lg">Expenditure</span>
            <div className="flex gap-2 items-center">
              <div className="w-4 h-4 bg-[#964b00] rounded-full"></div>
              <span className="text-sm">Vegetables</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
              <span className="text-sm">Vessels</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-4 h-4 bg-[#005298] rounded-full"></div>
              <span className="text-sm">Liquid</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-4 h-4 bg-[#cc8400] rounded-full"></div>
              <span className="text-sm">Essentials</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-4 h-4 bg-[#ff0000] rounded-full"></div>
              <span className="text-sm">Miscellaneous</span>
            </div>
          </div>
          <div className="w-[200px] h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data3}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="expense"
                  label
                >
                  {data3.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS1[index % COLORS1.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area Chart 1 - Profit */}
        <div className="bg-white shadow-lg rounded-xl p-4 min-h-[280px]">
          <h3 className="font-semibold mb-2">Weekly Profit</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart
              data={data2}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#009d7f" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#009d7f" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#009d7f"
                fillOpacity={1}
                fill="url(#colorProfit)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart 2 - Student Count */}
        <div className="bg-white shadow-lg rounded-xl p-4 min-h-[280px]">
          <h3 className="font-semibold mb-2">Daily Student Count</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorStudent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#005298" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#005298" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#005298"
                fillOpacity={1}
                fill="url(#colorStudent)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboad;
