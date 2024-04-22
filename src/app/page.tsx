import React from 'react';
import './globals.css'; // Import the CSS file
import Navbar from '@/pages/navebar';

export default function Home() {
  return (
  <>
  <Navbar isAuthenticated={false} />
    <main className="main-container">
      <div className="title-container">
        <h1 className="title">Welcome to Your App</h1>
        <p className="subtitle">Choose an option below:</p>
      </div>

      <div className="buttons-container">
        <a href="/login" className="button login-button">Login</a>
        <a href="/signup" className="button signup-button">Sign Up</a>
      </div>
    </main>
    </>
  );
}
