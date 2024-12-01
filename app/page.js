"use client";

import React, { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset the message

    try {
      const response = await fetch("/api/addData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        setMessage("Data added successfully!");
        setName("");
        setEmail("");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setMessage("An unexpected error occurred.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Welcome to the MongoDB Atlas App</h1>
        <p>Store your data securely and efficiently!</p>
      </header>

      <main className="main-content">
        <section className="form-section">
          <h2>Submit Your Details</h2>
          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="name">
              Name:
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </label>
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </form>
          {message && <p className="message">{message}</p>}
        </section>

        <section className="extra-content">
          <h2>About This App</h2>
          <p>
            This app demonstrates how to connect a Next.js frontend with MongoDB Atlas to store user data
            securely. Built with simplicity and performance in mind, it&apos;s deployable on Vercel with ease.
          </p>
          <p>
            Explore the code, and feel free to enhance it to suit your needs. Happy coding!
          </p>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 MongoDB Atlas App. All rights reserved.</p>
      </footer>
    </div>
  );
}
