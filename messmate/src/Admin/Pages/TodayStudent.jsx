import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "../../Api/axios";

const TodayStudent = () => {
  const [users, setUsers] = useState([]);
  const [type, setType] = useState("Breakfast");
  const [alert, setAlert] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const row = 20;
  const totalpages = Math.ceil(users.length / row);
  const [startingindex, setstartingindex] = useState(0);

  useEffect(() => {
    const getData = async (e) => {
      // if button enabled with JS hack
      try {
        const response = await axios.get(`/userplan/getTodayStudent/${type}`, {
          withCredentials: true,
        });

        setUsers(response.data);
      } catch (err) {
      }
    };

    getData();
  }, [type]);

  const handlePayment = async (userId, planId) => {
    try {
      const response = await axios.patch(
        `userplan/updateUserPlan`,
        JSON.stringify({ userId, planId }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setAlert(true);
    } catch (error) {
      if (!error?.response) {
      } else {
      }
    }
  };

  const content = users
    .filter((item, i) => {
      return item.userId.toString().includes(search) ||
        item.planId.toString().includes(search) ||
        item.fee_status
        ? "paid".includes(search)
        : "none".includes(search);
    })
    .slice(startingindex, startingindex + row)
    .map((user) => {
      return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="w-4 p-4">
            <div className="flex items-center text-black">{user.userId}</div>
          </td>
          <td className="text-black px-6 py-4">
            <div className="flex items-center text-black">{user.planId}</div>
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center text-black">
              {user.fee_status ? (
                <div className="w-[2rem] h-[2rem] border rounded-full bg-green-700"></div>
              ) : (
                <div className="w-[2rem] h-[2rem] border rounded-full bg-red-700"></div>
              )}
            </div>
          </td>
        </tr>
      );
    });

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
      setstartingindex((page - 1) * row);
    }
  };

  const handleNextPage = () => {
    if (page < totalpages - 1) {
      setPage(page + 1);
      setstartingindex((page + 1) * row);
    }
  };

  return (
    <div className="w-full">
      <select
        id="day"
        name="menu_day"
        class="bg-gray-50 border p-2 rounded w-[16rem]"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
      </select>
      <div className="flex items-center justify-around  pb-4 bg-white dark:bg-gray-900">
        <span className="h2">Total Students : {users.length}</span>
        <div className="relative">
          <div className="absolute inset-y-2 right-0 px-1  flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
        </div>
      </div>

      <div className="max-h-[60vh] overflow-y-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
          <thead className="text-xs text-white uppercase bg-dark dark:bg-gray-700 dark:text-gray-400 sticky top-0">
            <tr>
              <th scope="col" className="w-[33%] px-4 py-3">
                UserId
              </th>
              <th scope="col" className="w-[33%] px-4 py-3">
                PlanID
              </th>
              <th scope="col" className="w-[33%] px-4 py-3">
                Fee Status
              </th>
            </tr>
          </thead>

          <tbody>{content}</tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 mb-4 px-4">
        <span className="text-sm text-gray-700">
          Page {page + 1} of {totalpages || 1}
        </span>
        <div className="flex gap-2">
          <button
            onClick={handlePrevPage}
            disabled={page === 0}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={page >= totalpages - 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodayStudent;
