import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SendMoney = () => {
  const [params] = useSearchParams();
  const id = params.get("id");
  const firstName = params.get("firstName");
  const lastName = params.get("lastName");
  const [amount, setAmount] = useState("");

  const navigate = useNavigate()

  const handleTransfer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: id,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response)
      navigate('/dashboard')
      alert(response.data.message)
    } catch (error) {
      alert(error.response.data.message)
      console.log(error)
    }
  };

  return (
    <div>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="shadow-lg w-[50%] gap-5 py-10 flex flex-col justify-center items-center">
          <h2 className="text-4xl">Send Money</h2>
          <div>
            <p>
              {firstName} {lastName}
            </p>
          </div>
          <div className="flex flex-col w-[50%]">
            <label htmlFor="amount">Amount in Rupee</label>
            <input
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-black border outline-none p-2"
              type="text"
              placeholder="Enter the amount"
            />
          </div>
          <div className="flex gap-4">
            <button onClick={handleTransfer} className="bg-green-400 p-4">
              Transfer Money
            </button>
            <button className="bg-red-400 p-4">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SendMoney;
