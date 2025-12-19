import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {

  const { authUser, updateProfile } = useContext(AuthContext)
  const navigate = useNavigate();

  const [selectedImg, setSelectedImg] = useState(null)
  const [name, setName] = useState(authUser?.fullName || "")
  const [bio, setBio] = useState(authUser?.bio || "")
  const [previewUrl, setPreviewUrl] = useState(authUser?.profilePic || assets.avatar_icon)

  // Update preview when image is selected
  useEffect(() => {
    if (selectedImg) {
      const objectUrl = URL.createObjectURL(selectedImg)
      setPreviewUrl(objectUrl)
      
      // Cleanup memory
      return () => URL.revokeObjectURL(objectUrl)
    }
  }, [selectedImg])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedImg) {
        await updateProfile({ fullName: name, bio });
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(selectedImg);
        reader.onload = async () => {
          const base64Image = reader.result;
          await updateProfile({ profilePic: base64Image, fullName: name, bio });
        }
      }
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center p-4 sm:p-6'>
      
      <div className='w-full max-w-4xl bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col-reverse md:flex-row'>
        
        {/* -------- Left Side: Form -------- */}
        <div className='flex-1 p-8 md:p-12 flex flex-col justify-center'>
          
          <div className='mb-8'>
            <button onClick={() => navigate('/')} className='flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 group'>
               <img src={assets.arrow_icon} alt="" className='w-4 rotate-180 opacity-70 group-hover:opacity-100 transition-opacity'/>
               Back to Chat
            </button>
            <h3 className="text-3xl font-semibold text-white">Edit Profile</h3>
            <p className='text-slate-400 text-sm mt-1'>Update your personal details and visibility.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Image Upload Button */}
            <div className='flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50'>
              <img src={previewUrl} alt="" className={`w-14 h-14 rounded-full object-cover border-2 border-slate-600`}/>
              <div>
                 <p className='text-white text-sm font-medium'>Profile Picture</p>
                 <label htmlFor="avatar" className='text-xs text-violet-400 cursor-pointer hover:text-violet-300 transition-colors'>
                    Change Photo
                 </label>
                 <input onChange={(e) => setSelectedImg(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden />
              </div>
            </div>

            <div className='space-y-4'>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm text-slate-300 ml-1'>Full Name</label>
                    <input 
                        onChange={(e) => setName(e.target.value)} 
                        value={name}
                        type="text" 
                        required 
                        placeholder='Your name' 
                        className='w-full bg-slate-950/30 text-white p-3.5 border border-slate-700 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 placeholder-slate-500 transition-all'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-sm text-slate-300 ml-1'>Bio</label>
                    <textarea 
                        onChange={(e) => setBio(e.target.value)} 
                        value={bio} 
                        placeholder="Write something about yourself..." 
                        required 
                        className='w-full bg-slate-950/30 text-white p-3.5 border border-slate-700 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 placeholder-slate-500 resize-none transition-all' 
                        rows={4}
                    ></textarea>
                </div>
            </div>

            <button type="submit" className="mt-4 w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium p-3.5 rounded-xl transition-all shadow-lg shadow-violet-900/20 hover:shadow-violet-900/40 transform hover:-translate-y-0.5">
                Save Changes
            </button>
          </form>
        </div>

        {/* -------- Right Side: Visual Preview -------- */}
        <div className='md:w-[40%] bg-gradient-to-b from-slate-800/50 to-slate-900/50 border-l border-slate-700/50 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden'>
            {/* Decorative blurs */}
            <div className='absolute top-0 right-0 w-64 h-64 bg-violet-600/20 rounded-full blur-[100px] -mr-16 -mt-16 pointer-events-none'></div>
            <div className='absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] -ml-16 -mb-16 pointer-events-none'></div>

            <h4 className='text-slate-400 text-xs font-semibold uppercase tracking-widest mb-8 z-10'>Live Preview</h4>
            
            <div className='relative group z-10'>
                <div className='absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full opacity-70 blur group-hover:opacity-100 transition duration-1000'></div>
                <img 
                    className='relative w-48 h-48 rounded-full object-cover border-4 border-slate-900 shadow-2xl' 
                    src={previewUrl} 
                    alt="Profile Preview" 
                />
            </div>
            
            <div className='mt-6 z-10 max-w-[80%]'>
                <h2 className='text-2xl font-bold text-white truncate'>{name || "Your Name"}</h2>
                <p className='text-slate-400 mt-2 text-sm leading-relaxed line-clamp-4'>{bio || "Your bio will appear here..."}</p>
            </div>
        </div>

      </div>
    </div>
  )
}

export default ProfilePage