// Navbar.tsx
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import './style.css';
const Navbar: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleSignOut = () => {
    localStorage.removeItem('accessToken'); 
    window.location.href = '/';
  };

  const handleDeleteAccount = () => {
    setShowConfirmation(false); // Close the confirmation popup
  };

  return (
    <nav className="navbar">
      <div className="brand">
        <Link href="/">
          Book Shelve
        </Link>
      </div>
      <div className="nav-links">
        {isAuthenticated ? (
          <>
          <Link href="/add-book">
          Add New Book
        </Link>
            <span onClick={handleSignOut}>Sign Out</span>
            <div className="dropdown">
              <span onClick={() => setShowConfirmation(true)}>Delete Account</span>
              {showConfirmation && (
                <div className="confirmation-popup">
                  <p>Are you sure you want to delete your account?</p>
                  <div className="buttons">
                    <button onClick={handleDeleteAccount}>Yes</button>
                    <button onClick={() => setShowConfirmation(false)}>No</button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link href="/login">
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
