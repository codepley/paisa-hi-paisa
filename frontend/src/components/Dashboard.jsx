import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [peers, setPeers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loggedInUser();
  }, []);

  useEffect(() => {
    fetchListOfUser();
  }, []);

  const fetchListOfUser = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/user/bulk");
    // console.log(response)
    setPeers(response.data.users);
  };

  const loggedInUser = async () => {
    try {
      // setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/get-logged-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const balance = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const tempUser = { ...response.data.user, balance: balance.data.balance };
      setUser(tempUser);
      // setLoading(false);
    } catch (error) {
      navigate("/signin");
      console.error("hello");
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    loggedInUser();
  };

  // if (showPaymentModal) {
  //   return (
  //     <div className="w-screen h-screen flex justify-center items-center">
  //       <div className="shadow-lg w-[50%] gap-5 py-10 flex flex-col justify-center items-center">
  //         <h2 className="text-4xl">Send Money</h2>
  //         <div>
  //           <p>Kushal Karan</p>
  //         </div>
  //         <div className="flex flex-col w-[50%]">
  //           <label htmlFor="amount">Amount in Rupee</label>
  //           <input
  //             id="amount"
  //             className="border-black border outline-none"
  //             type="text"
  //           />
  //         </div>
  //         <div className="flex gap-4">
  //           <button className="bg-green-400 p-4">Transfer Money</button>
  //           <button onClick={() => setShowPaymentModal(false)} className="bg-red-400 p-4">Cancel</button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="w-screen h-screen">
      <div className="w-full box-border flex justify-between px-5 py-4 bg-gray-400">
        <h2 className="text-2xl">Paisa hi Paisa</h2>
        <div className="flex gap-4 justify-center items-center">
          <p>Hello, {user.firstName}</p>
          <p className="w-10 h-10 flex justify-center items-center bg-white rounded-full">
            {user.firstName?.slice(0, 1)}
          </p>
          <p onClick={handleLogout} className="cursor-pointer">
            Logout
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col box-border p-4">
        <h2 className="text-xl font-bold">Your balance: ${user.balance}</h2>
        <div>
          <h2 className="text-xl font-bold">Users</h2>
          <input
            className="border-black border w-full p-2"
            type="text"
            placeholder="Search users..."
          />
          <div className="flex flex-col gap-2 mt-2">
            {peers.map((item) => {
              return (
                <div
                  className="flex justify-between items-center mx-2 p-2"
                  key={item._id}
                >
                  <p>
                    {item.firstName} {item.lastName}
                  </p>
                  <button
                    onClick={() => navigate(`/send?id=${item._id}&firstName=${item.firstName}&lastName=${item.lastName}`)}
                    className="bg-black text-white rounded-lg px-4 py-2 cursor-pointer"
                  >
                    Send Money
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
