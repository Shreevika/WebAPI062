import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { FormInput } from "../../../Components/FormElements";
import { Button } from "../../../Components/Button";

export default function RegisterPage() {
  const [frmState, setFrmState] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}user/register`,
        frmState
      );

      if (response.data.status) {
        setLoading(false);
        alert(response.data.message);
        window.location.href = "/login";
      } else {
        setLoading(false);
        alert(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col gap-5 bg-white shadow-md p-10 lg:min-w-[400px] sm:min-w-[350px]">
        <p className="font-semibold text-xl">Welcome to TRTL</p>
        <p className="text-sm text-gray-700">Please create your account.</p>
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <FormInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={frmState.email}
            onChange={(e) =>
              setFrmState({ ...frmState, email: e.target.value })
            }
            required
          />
          <FormInput
            label="Name"
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setFrmState({ ...frmState, name: e.target.value })}
            required
          />
          <FormInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) =>
              setFrmState({ ...frmState, password: e.target.value })
            }
            required
          />
          <Button title="Register" type="submit" isLoading={loading} />
        </form>
        <p className="text-center">
          Do you have an account?
          <Link to="/login" className="ml-2 underline cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
