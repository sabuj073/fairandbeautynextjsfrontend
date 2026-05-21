import React from 'react';

const UserProfile = () => {
  return (
    <div className="flex flex-col items-center bg-purple-50 rounded-lg p-6 w-80 mx-auto shadow-lg">
      {/* Greeting Section */}
      <h1 className="text-2xl font-semibold text-gray-800">Hello Mahjabin!</h1>
      <p className="text-sm text-gray-500 mt-1">
        welcome to the wonderland, where beauty dreams come true
      </p>

      {/* Refer a Friend Section */}
      <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-lg p-4 mt-4 w-full text-center">
        <p className="font-medium">Refer a friend & earn rewards</p>
        <p className="text-xs mt-1">Both will get coins worth ₹50*</p>
        <div className="flex items-center justify-center gap-4 mt-3">
          <button className="bg-white text-purple-600 font-semibold py-1 px-4 rounded-md">
            Refer Now
          </button>
          <button className="bg-white text-purple-600 font-semibold py-1 px-4 rounded-md flex items-center">
            BQVRGH
            <svg
              className="w-4 h-4 ml-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a3 3 0 016 0v4m-6 4h6m-3-10a1 1 0 000-2 1 1 0 000 2zm7 7a1 1 0 00-1 1v4a3 3 0 01-3 3H8a3 3 0 01-3-3v-4a1 1 0 10-2 0v4a5 5 0 005 5h8a5 5 0 005-5v-4a1 1 0 00-1-1z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Options */}
      <div className="mt-6 w-full space-y-2">
        {[
          { label: 'AUTHENTIC Rewards', icon: '🎉' },
          { label: 'My Profile', icon: '👤' },
          { label: 'My Order', icon: '📦' },
          { label: 'Saved Addresses', icon: '📍' },
          { label: 'FAQs', icon: '❓' },
          { label: 'Help', icon: '💬' },
        ].map((item, index) => (
          <button
            key={index}
            className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-md text-gray-700 font-medium shadow-sm hover:bg-gray-50"
          >
            <span className="flex items-center">
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </span>
            <span>➔</span>
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <button className="bg-purple-600 text-white font-semibold py-2 px-4 mt-6 rounded-md w-full hover:bg-purple-700">
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
