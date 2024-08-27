import { useState } from "react";
import "./App.css";
import React from "react";

function App() {
  const [signupValue, setSignupValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handlechange = (e) => {
    setSignupValue({
      ...signupValue,
      [e.target.name]: e.target.value,
    });
  };

  function validateEmail(email) {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return pattern.test(email);
  }
  const handleclick = (e) => {
    e.preventDefault();
    if (!validateEmail(signupValue.email))
      return setError("The email you input is invalid");
    else if (signupValue.password.length < 5)
      return setError(
        "the password you entered should contain 5 or more characters"
      );
    else if (signupValue.password !== signupValue.confirmPassword)
      return setError("the password don't match. Try again.");
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <form className="space-y-6">
        <div className="mb-3">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={signupValue.email}
            onChange={handlechange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={signupValue.password}
            onChange={handlechange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="password"
            name="confirmPassword"
            value={signupValue.confirmPassword}
            onChange={handlechange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        {error && <p className="text-pink-600">{error}</p>}
        <button
          type="submit"
          className="bg-purple-500 text-white rounded-full"
          onClick={handleclick}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
