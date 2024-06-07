import React, { useState } from "react";

const Login = ({ setUser }) => {
  const [inp, setInp] = useState("");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "2rem",
        flexDirection: "column",
      }}
    >
      <h1>Signin to demo</h1>

      <div
        style={{
          backgroundColor: "gray",
          borderRadius: "5px",
          padding: "20px",
        }}
      >
        <input
          style={{
            padding: "10px",
            margin: "10px",
            borderRadius: "5px",
            outline: "none",
            border: "none",
          }}
          value={inp}
          onChange={(e) => setInp(e.target.value)}
          type="text"
          placeholder="Enter your name"
        />
        <button
          onClick={() => {
            localStorage.setItem("bird_auction_name", inp);
            setUser(inp);
          }}
          style={{
            padding: "10px",
            margin: "10px",
            borderRadius: "5px",
            outline: "none",
            border: "none",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
