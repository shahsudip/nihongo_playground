import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between p-4 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] shadow-md">
      {/* Logo Area */}
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-black italic tracking-tighter" style={{ color: 'rgb(255, 161, 208)', textShadow: 'black -1px -1px 0px, black 1px -1px 0px, black -1px 1px 0px, black 1px 1px 0px' }}>
          Nihongo Playground
        </Link>
      </div>

      {/* Right side navigation & stats */}
      <div className="flex items-center space-x-4">
        {/* Stats Box (Hidden on mobile) */}
        <div className="hidden md:flex w-[250px]">
          <div className="w-full">
            <div className="flex flex-col bg-white rounded-[8px] border border-black overflow-hidden">
              <div className="flex">
                <div className="flex items-center justify-between flex-1 bg-[#FEFCE0] px-4 py-2">
                  <span className="text-2xl -ml-1 mr-1">⭐</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-700 font-medium">26</span>
                    <span className="text-gray-700">pts</span>
                  </div>
                </div>
                <div className="w-px bg-black"></div>
                <div className="flex flex-col justify-center items-center flex-1 px-2">
                  <span className="font-bold text-gray-900 text-sm">LEVEL 1</span>
                  <span className="text-xs text-gray-700">Newbie</span>
                </div>
              </div>
              <div className="h-px bg-black"></div>
              {/* Progress bar */}
              <div className="flex h-[10px] w-full">
                <div className="bg-[#EAFBF1]" style={{ width: '8.66667%' }}></div>
                <div className="bg-[#999999]" style={{ width: '91.3333%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Button */}
        <div className="relative flex flex-col items-center z-[1000] mx-2">
          <button 
            onClick={() => navigate('/profile')}
            className="w-[57px] h-[57px] bg-black hover:bg-white border text-white hover:text-black border-black rounded-[8px] flex items-center justify-center transition-all group"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="text-2xl cursor-pointer" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
            </svg>
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="block md:hidden">
          <button className="w-[57px] h-[57px] bg-black hover:bg-white border text-white hover:text-black border-black rounded-[8px] p-2 flex items-center justify-center transition-all">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="text-2xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
