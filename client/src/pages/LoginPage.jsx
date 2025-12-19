import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {

  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext)

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currState === 'Sign up' && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return;
    }

    login(currState === "Sign up" ? 'signup' : 'login', { fullName, email, password, bio })
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center sm:px-10 p-4'>
      
      <div className='w-full max-w-[1000px] flex justify-center items-center gap-10 sm:justify-evenly max-sm:flex-col'>
        
        {/* -------- Left / Logo Section -------- */}
        <div className='flex flex-col items-center sm:items-start gap-4 animate-fade-in'>
          <img src={assets.logo_big} alt="Logo" className='w-[180px] sm:w-[250px] drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]' />
          <p className='text-slate-400 text-sm sm:text-base hidden sm:block text-center sm:text-left'>
             Connect with your friends and family <br /> seamlessly in a modern environment.
          </p>
        </div>

        {/* -------- Right / Form Section -------- */}
        <form onSubmit={onSubmitHandler} 
          className='bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-2xl shadow-2xl w-full sm:max-w-md flex flex-col gap-5 transition-all duration-300'
        >
          
          <div className='flex justify-between items-center mb-2'>
             <h2 className='font-semibold text-2xl text-white tracking-wide'>
              {currState}
            </h2>
            {isDataSubmitted && (
                <button 
                  type="button"
                  onClick={() => setIsDataSubmitted(false)} 
                  className='text-slate-400 hover:text-white flex items-center gap-1 text-sm transition-colors'
                >
                  <img src={assets.arrow_icon} alt="Back" className='w-4 rotate-180 opacity-70'/> Back
                </button>
            )}
          </div>

          {/* Form Inputs with Transition */}
          <div className='flex flex-col gap-4'>
            
            {currState === "Sign up" && !isDataSubmitted && (
              <div className='group'>
                <input 
                  onChange={(e) => setFullName(e.target.value)} 
                  value={fullName}
                  type="text" 
                  className='w-full bg-slate-950/30 text-white p-3.5 border border-slate-700 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 placeholder-slate-500 transition-all' 
                  placeholder="Full Name" 
                  required 
                />
              </div>
            )}

            {!isDataSubmitted && (
              <>
                <input 
                  onChange={(e) => setEmail(e.target.value)} 
                  value={email}
                  type="email" 
                  placeholder='Email Address' 
                  required 
                  className='w-full bg-slate-950/30 text-white p-3.5 border border-slate-700 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 placeholder-slate-500 transition-all'
                />
                <input 
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password}
                  type="password" 
                  placeholder='Password' 
                  required 
                  className='w-full bg-slate-950/30 text-white p-3.5 border border-slate-700 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 placeholder-slate-500 transition-all'
                />
              </>
            )}

            {currState === "Sign up" && isDataSubmitted && (
              <div className='animate-fade-in'>
                 <label className='text-slate-300 text-sm ml-1 mb-2 block'>Tell us about yourself</label>
                 <textarea 
                    onChange={(e) => setBio(e.target.value)} 
                    value={bio}
                    rows={4} 
                    className='w-full bg-slate-950/30 text-white p-3.5 border border-slate-700 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 placeholder-slate-500 resize-none transition-all' 
                    placeholder='Hello! I am using this chat app...' 
                    required
                  ></textarea>
              </div>
            )}
          </div>

          <button type='submit' className='mt-2 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-violet-500/30'>
            {currState === "Sign up" ? (isDataSubmitted ? "Create Account" : "Next Step") : "Login Now"}
          </button>

          <div className='flex items-start gap-2 text-xs text-slate-400 mt-1'>
            <input type="checkbox" className='mt-0.5 accent-violet-500' required />
            <p>I agree to the <span className='text-violet-400 cursor-pointer hover:underline'>terms of use</span> & <span className='text-violet-400 cursor-pointer hover:underline'>privacy policy</span>.</p>
          </div>

          <div className='flex flex-col gap-2 mt-2 text-center'>
            {currState === "Sign up" ? (
              <p className='text-sm text-slate-400'>
                Already have an account? <span onClick={() => { setCurrState("Login"); setIsDataSubmitted(false) }} className='font-medium text-violet-400 cursor-pointer hover:text-violet-300 transition-colors'>Login here</span>
              </p>
            ) : (
              <p className='text-sm text-slate-400'>
                Don't have an account? <span onClick={() => setCurrState("Sign up")} className='font-medium text-violet-400 cursor-pointer hover:text-violet-300 transition-colors'>Sign up here</span>
              </p>
            )}
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default LoginPage