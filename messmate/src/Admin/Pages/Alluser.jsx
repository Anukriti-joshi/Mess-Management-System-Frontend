import React, { useEffect, useState } from "react";
import axios from "../../Api/axios";
import EditModal from "./EditModal";

function Alluser() {
  const [editModal, setEditModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const row = 20;
  const totalpages = Math.ceil(users.length / row);
  const [startingindex, setstartingindex] = useState(0);

  // const {
  //     isLoading,
  //     isError,
  //     error,
  //     data: users,
  //     isFetching,
  //     isPreviousData,
  // } = useQuery(['/users', page], () => getUsersPage(page), {
  //     keepPreviousData: true
  // })

  useEffect(() => {
    const getData = async (e) => {
      // if button enabled with JS hack
      try {
        const response = await axios.get("/users/getusers", {
          withCredentials: true,
        });

        setUsers(response.data);
      } catch (err) {
      }
    };

    getData();
  }, [editModal]);

  const handleDelete = async (email) => {
    try {
      const response = await axios.delete(
        `users/delete/${email}`,
        JSON.stringify({ email }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    } catch (error) {
      if (!error?.response) {
      } else {
      }
    }
  };
  const handleEdit = (email) => {
    setUserEmail(email);
    setEditModal(true);
  };

  const content = users
    .filter((item, i) => {
      return (
        item.name.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search) ||
        (item.role === 0 ? "user" : "admin").includes(search)
      );
    })
    .slice(startingindex, startingindex + row)
    .map((user) => {
      return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="w-4 p-4">
            <div className="flex items-center justify-center text-black">
              {user.userId}
            </div>
          </td>
          <td className="text-black px-6 py-4">
            <div className="flex items-center justify-center text-black">
              {user.name}
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center justify-center  text-black">
              {user.email}
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center justify-center text-black">
              {user.mobileno}
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center justify-center text-black">
              {user.role === 1 ? (
                <p className="bg-lime-300 rounded-md p-[2.5px] px-2  text-black text-sm">
                  Admin
                </p>
              ) : user.role === 2 ? (
                <p className="px-2 text-black text-sm ">Employee</p>
              ) : (
                <p className="px-2 text-black text-sm ">User</p>
              )}
            </div>
          </td>
          <td className="px-6 py-4">
            {/* <button>Edit </button> */}
            <button
              type="button"
              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-[0.5rem] text-center mr-2 mb-2 "
              onClick={() => handleEdit(user.email)}
            >
              Edit
            </button>
            <button
              type="button"
              class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-[0.5rem] text-center mr-2 mb-2"
              onClick={() => handleDelete(user.email)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  // const searchintable = (e) => {
  //   setSearch(e.target.value);
  //   setUsers(users.filter((item) =>{
  //     return item.name=== search;
  //   }))
  // };
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
    <div className="relative w-full shadow-xl sm:rounded-lg">
      {editModal ? (
        <EditModal setEditmodal={setEditModal} userEmail={userEmail} />
      ) : (
        ""
      )}

      <div className="flex items-center justify-end pb-4 bg-white dark:bg-gray-900">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
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
          {/* <label>Search</label> */}
          <input
            type="text"
            id="table-search-users"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
            onChange={(e) => {
              setSearch(e.target.value.toLowerCase());
            }}
            value={search}
          />
        </div>
      </div>
      {/* ---------------------------------------------------------------------------------------------- */
      /*                                         table main part                                        */
      /* ---------------------------------------------------------------------------------------------- */}

      <div className="max-h-[60vh] overflow-y-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
          <thead className="text-xs text-white uppercase bg-dark dark:bg-gray-700 dark:text-gray-400 sticky top-0">
            <tr>
              <th scope="col" className="px-4 py-3 w-[10%] text-center">
                UserId
              </th>
              <th scope="col" className="px-4 py-3 w-[15%] text-center">
                Name
              </th>
              <th scope="col" className="px-4 py-3 w-[25%] text-center">
                Email id
              </th>
              <th scope="col" className="px-4 py-3 w-[15%] text-center">
                Mobile no
              </th>
              <th scope="col" className="px-4 py-3 w-[10%] text-center">
                Role
              </th>
              <th scope="col" className="px-4 py-3 w-[25%] text-center">
                Operation
              </th>
            </tr>
          </thead>

          <tbody>{content}</tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 mb-4 px-4">
        <span className="text-sm text-gray-700">
          Page {page + 1} of {totalpages || 1} ({users.length} users)
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
}

export default Alluser;
