import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import SendMoney from "./components/SendMoney"
import { useEffect, useState } from "react"
import axios from 'axios'

function App() {

  const [user, setUser] = useState(null);

  async function getUser() {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/user/get-logged-user")
      console.log(response)
    } catch (error) {
      console.log("error")
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
