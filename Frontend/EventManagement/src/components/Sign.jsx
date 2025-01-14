"use client"

import React, { useState } from 'react'
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa'

export default function Sign() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false)
  const [signInData, setSignInData] = useState({ email: '', password: '' })
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const toggleRightPanel = () => {
    setIsRightPanelActive(!isRightPanelActive)
  }

  const handleInputChange = (e, setData) => {
    const { name, value } = e.target
    setData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    if (!signUpData.name || !signUpData.email || !signUpData.password) {
      setError('All fields are required for Sign Up!')
      return
    }
    setError('')
    alert('Sign-up successful!')
  }

  const handleSignIn = (e) => {
    e.preventDefault()
    if (!signInData.email || !signInData.password) {
      setError('Please enter your email and password for Sign In!')
      return
    }
    setError('')
    alert('Sign-in successful!')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-['Montserrat',sans-serif] -mt-5 mb-[50px]">
      <div
        className={`bg-white rounded-[10px] shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] relative overflow-hidden w-[90%] max-w-[768px] min-h-[480px] transition-all duration-600 ease-in-out ${
          isRightPanelActive ? 'right-panel-active' : ''
        }`}
      >
        {/* Sign Up Form */}
        <div
          className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 ${
            isRightPanelActive ? 'transform translate-x-full opacity-100 z-5' : 'opacity-0 z-1'
          }`}
        >
          <form onSubmit={handleSignUp} className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center">
            <h1 className="font-bold m-0 text-blue-800">Create Account</h1>
            <div className="my-5 flex">
              <a href="#" className="border border-blue-300 rounded-full inline-flex justify-center items-center m-0 h-10 w-10">
                <FaFacebookF />
              </a>
              <a href="#" className="border border-blue-300 rounded-full inline-flex justify-center items-center m-0 h-10 w-10 mx-[5px]">
                <FaGooglePlusG />
              </a>
              <a href="#" className="border border-blue-300 rounded-full inline-flex justify-center items-center m-0 h-10 w-10">
                <FaLinkedinIn />
              </a>
            </div>
            <span className="text-xs text-blue-600">or use your email for registration</span>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="bg-blue-100 border-none py-3 px-[15px] my-2 w-full"
              onChange={(e) => handleInputChange(e, setSignUpData)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="bg-blue-100 border-none py-3 px-[15px] my-2 w-full"
              onChange={(e) => handleInputChange(e, setSignUpData)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="bg-blue-100 border-none py-3 px-[15px] my-2 w-full"
              onChange={(e) => handleInputChange(e, setSignUpData)}
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <button className="rounded-[20px] bg-blue-500 text-blue-900 text-xs font-bold py-3 px-[45px] uppercase tracking-[1px] transition-transform duration-80 ease-in mt-4 active:scale-95 focus:outline-none">
              Sign Up
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div
          className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-2 ${
            isRightPanelActive ? 'transform translate-x-full' : ''
          }`}
        >
          <form onSubmit={handleSignIn} className="bg-white flex items-center justify-center flex-col px-[50px] h-full text-center">
            <h1 className="font-bold m-0 text-blue-800">Sign In</h1>
            <div className="my-5 flex">
              <a href="#" className="border border-blue-200 rounded-full inline-flex justify-center items-center m-0 h-10 w-10">
                <FaFacebookF />
              </a>
              <a href="#" className="border border-blue-200 rounded-full inline-flex justify-center items-center m-0 h-10 w-10 mx-[5px]">
                <FaGooglePlusG />
              </a>
              <a href="#" className="border border-blue-200 rounded-full inline-flex justify-center items-center m-0 h-10 w-10">
                <FaLinkedinIn />
              </a>
            </div>
            <span className="text-xs text-blue-600">or use your account</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="bg-blue-100 border-none py-3 px-[15px] my-2 w-full"
              onChange={(e) => handleInputChange(e, setSignInData)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="bg-blue-100 border-none py-3 px-[15px] my-2 w-full"
              onChange={(e) => handleInputChange(e, setSignInData)}
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <a href="#" className="text-sm text-blue-600 no-underline my-[15px]">
              Forgot your password?
            </a>
            <button className="rounded-[20px] bg-blue-500 text-blue-900 text-xs font-bold py-3 px-[45px] uppercase tracking-[1px] transition-transform duration-80 ease-in mt-4 active:scale-95 focus:outline-none">
              Sign In
            </button>
          </form>
        </div>

        {/* Overlay Panels */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-100 ${
            isRightPanelActive ? 'transform -translate-x-full' : ''
          }`}
        >
          <div
            className={`bg-blue-500 bg-no-repeat bg-cover text-white relative -left-full h-full w-[200%] transform transition-transform duration-600 ease-in-out ${
              isRightPanelActive ? 'translate-x-1/2' : 'translate-x-0'
            }`}
          >
            <div
              className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transform transition-transform duration-600 ease-in-out ${
                isRightPanelActive ? 'translate-x-0' : '-translate-x-[20%]'
              } overlay-left`}
            >
              <h1 className="font-bold text-2xl m-0">Welcome Back!</h1>
              <p className="text-sm font-[100] leading-5 tracking-[0.5px] my-5 mx-0">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="bg-transparent border-white rounded-[20px] border text-white text-xs font-bold py-3 px-[45px] uppercase tracking-[1px] transition-transform duration-80 ease-in mt-4 active:scale-95 focus:outline-none"
                onClick={toggleRightPanel}
              >
                Sign In
              </button>
            </div>

            <div
              className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transform transition-transform duration-600 ease-in-out right-0 ${
                isRightPanelActive ? 'translate-x-[20%]' : 'translate-x-0'
              } overlay-right`}
            >
              <h1 className="font-bold text-2xl m-0">Hello, Friend!</h1>
              <p className="text-sm font-[100] leading-5 tracking-[0.5px] my-5 mx-0">
                Enter your personal details and start your journey with us
              </p>
              <button
                className="bg-transparent border-white rounded-[20px] border text-white text-xs font-bold py-3 px-[45px] uppercase tracking-[1px] transition-transform duration-80 ease-in mt-4 active:scale-95 focus:outline-none"
                onClick={toggleRightPanel}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-blue-800 text-white text-sm fixed bottom-0 left-0 right-0 text-center z-[999]">
        © 2025 Persistent Ventures
      </footer>
    </div>
  )
}
