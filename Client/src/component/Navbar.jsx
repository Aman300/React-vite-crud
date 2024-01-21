// Navbar.js
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);

  const setMode = () => {
    setIsNightMode(!isNightMode);
    if (isNightMode) {
      localStorage.setItem('mode', 'light');
      document.body.classList.add('bg-gray-900');
    } else {
      localStorage.setItem('mode', 'dark');
      document.body.classList.remove('bg-gray-900');
    }
  };

  if(localStorage.getItem('mode') === 'dark') {
    document.body.classList.add('bg-gray-900');
  } else {
    document.body.classList.remove('bg-gray-900');
  }





  let auth = localStorage.getItem('token')
  auth = JSON.parse(auth)
  let user = JSON.parse(localStorage.getItem("user"));

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl ">
          <a href="#">
            <img src="https://goridemoto.com/wp-content/uploads/2022/09/logo4.png" className='w-40' alt="logo" />
          </a>
        </div>

        {/* Responsive menu button for small screens */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="h-6 w-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar menu for mobile view */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-gray-800 bg-opacity-75" onClick={toggleMenu}></div>
        )}

        <div className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-sm transition-transform transform ${isMenuOpen ? 'translate-x-0 text-center flex justify-center items-center' : '-translate-x-full'}`}>
          <div className="p-4">
            <Link to="/" className="block text-gray-600 hover:text-gray-800">Home</Link>
            <br />
            <Link to="/contact-list" className="block text-gray-600 hover:text-gray-800">Contact List</Link>
            <br />
            <Link to="/become-a-mentor" className="block text-gray-600 hover:text-gray-800">My Blog</Link>
            <br />
            <Link to="/plans-and-pricing" className="block text-gray-600 hover:text-gray-800">My Profile</Link>
            <br />
            <div className="md:hidden">

              {auth ? <button onClick={(e) => logout(e)} className="group inline-flex items-center justify-center rounded-full  py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-600 text-white hover:bg-indigo-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
                variant="solid"
                color="slate">
                <svg className="fill-current w-4 h-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          fill="none"><path fillRule="evenodd"
          clipRule="evenodd"
          d="M6 8a1 1 0 0 0 1-1V5.923c0-.459.022-.57.082-.684a.364.364 0 0 1 .157-.157c.113-.06.225-.082.684-.082h10.154c.459 0 .57.022.684.082.07.038.12.087.157.157.06.113.082.225.082.684v12.154c0 .459-.022.57-.082.684a.363.363 0 0 1-.157.157c-.113.06-.225.082-.684.082H7.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V17a1 1 0 1 0-2 0v1.077c0 .76.082 1.185.319 1.627.223.419.558.753.977.977.442.237.866.319 1.627.319h10.154c.76 0 1.185-.082 1.627-.319.419-.224.753-.558.977-.977.237-.442.319-.866.319-1.627V5.923c0-.76-.082-1.185-.319-1.627a2.363 2.363 0 0 0-.977-.977C19.262 3.082 18.838 3 18.077 3H7.923c-.76 0-1.185.082-1.627.319a2.363 2.363 0 0 0-.978.977C5.083 4.738 5 5.162 5 5.923V7a1 1 0 0 0 1 1zm9.593 2.943c.584.585.584 1.53 0 2.116L12.71 15.95c-.39.39-1.03.39-1.42 0a.996.996 0 0 1 0-1.41 9.552 9.552 0 0 1 1.689-1.345l.387-.242-.207-.206a10 10 0 0 1-2.24.254H2.998a1 1 0 1 1 0-2h7.921a10 10 0 0 1 2.24.254l.207-.206-.386-.241a9.562 9.562 0 0 1-1.69-1.348.996.996 0 0 1 0-1.41c.39-.39 1.03-.39 1.42 0l2.883 2.893z"
          fill=""/></svg>
          <span>Logout</span>
            </button>
            :


            <Link to="/login" ><button className="group inline-flex items-center justify-center rounded-full  py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-600 text-white hover:bg-indigo-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
              variant="solid"
              color="slate">
                <svg className="fill-current w-4 h-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        fill="none"><path fillRule="evenodd"
          clipRule="evenodd"
          d="M6 8a1 1 0 0 0 1-1V5.923c0-.459.022-.57.082-.684a.364.364 0 0 1 .157-.157c.113-.06.225-.082.684-.082h10.154c.459 0 .57.022.684.082.07.038.12.087.157.157.06.113.082.225.082.684v12.154c0 .459-.022.57-.082.684a.363.363 0 0 1-.157.157c-.113.06-.225.082-.684.082H7.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V17a1 1 0 1 0-2 0v1.077c0 .76.082 1.185.319 1.627.223.419.558.753.977.977.442.237.866.319 1.627.319h10.154c.76 0 1.185-.082 1.627-.319.419-.224.753-.558.977-.977.237-.442.319-.866.319-1.627V5.923c0-.76-.082-1.185-.319-1.627a2.363 2.363 0 0 0-.977-.977C19.262 3.082 18.838 3 18.077 3H7.923c-.76 0-1.185.082-1.627.319a2.363 2.363 0 0 0-.978.977C5.083 4.738 5 5.162 5 5.923V7a1 1 0 0 0 1 1zm9.593 2.943c.584.585.584 1.53 0 2.116L12.71 15.95c-.39.39-1.03.39-1.42 0a.996.996 0 0 1 0-1.41 9.552 9.552 0 0 1 1.689-1.345l.387-.242-.207-.206a10 10 0 0 1-2.24.254H2.998a1 1 0 1 1 0-2h7.921a10 10 0 0 1 2.24.254l.207-.206-.386-.241a9.562 9.562 0 0 1-1.69-1.348.996.996 0 0 1 0-1.41c.39-.39 1.03-.39 1.42 0l2.883 2.893z"
          fill=""/></svg>
          <span>Sign in</span>
            </button>
            </Link>
            }
            <br /><br />
         <h5>{auth ? user.name
         : ""}</h5>
        <br /><br />

          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {/* cross svg colog need to dark*/}
            <svg
              className="h-6 w-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

        </div>
          </div>
        </div>

        {/* Navigation links for larger screens */}
        <div className={`hidden md:flex space-x-10`}>
          <Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link>
          <Link to="/contact-list" className="text-gray-600 hover:text-gray-800">Contact List</Link>
          <Link to="/become-a-mentor" className="text-gray-600 hover:text-gray-800">My Blog</Link>
          <Link to="/plans-and-pricing" className="text-gray-600 hover:text-gray-800">My Profile</Link>
        </div>
        {/* signin button */}
        <div className="hidden md:flex space-x-10">

          {auth ?
        <button onClick={(e) => logout(e)} className="group inline-flex items-center justify-center rounded-full  py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-600 text-white hover:bg-indigo-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
          variant="solid"
          color="slate">
          <svg className="fill-current w-4 h-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
    fill="none"><path fillRule="evenodd"
      clipRule="evenodd"
      d="M6 8a1 1 0 0 0 1-1V5.923c0-.459.022-.57.082-.684a.364.364 0 0 1 .157-.157c.113-.06.225-.082.684-.082h10.154c.459 0 .57.022.684.082.07.038.12.087.157.157.06.113.082.225.082.684v12.154c0 .459-.022.57-.082.684a.363.363 0 0 1-.157.157c-.113.06-.225.082-.684.082H7.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V17a1 1 0 1 0-2 0v1.077c0 .76.082 1.185.319 1.627.223.419.558.753.977.977.442.237.866.319 1.627.319h10.154c.76 0 1.185-.082 1.627-.319.419-.224.753-.558.977-.977.237-.442.319-.866.319-1.627V5.923c0-.76-.082-1.185-.319-1.627a2.363 2.363 0 0 0-.977-.977C19.262 3.082 18.838 3 18.077 3H7.923c-.76 0-1.185.082-1.627.319a2.363 2.363 0 0 0-.978.977C5.083 4.738 5 5.162 5 5.923V7a1 1 0 0 0 1 1zm9.593 2.943c.584.585.584 1.53 0 2.116L12.71 15.95c-.39.39-1.03.39-1.42 0a.996.996 0 0 1 0-1.41 9.552 9.552 0 0 1 1.689-1.345l.387-.242-.207-.206a10 10 0 0 1-2.24.254H2.998a1 1 0 1 1 0-2h7.921a10 10 0 0 1 2.24.254l.207-.206-.386-.241a9.562 9.562 0 0 1-1.69-1.348.996.996 0 0 1 0-1.41c.39-.39 1.03-.39 1.42 0l2.883 2.893z"
      fill=""/></svg>
          <span>Logout</span>

        </button>
          :
        <Link to="/login" ><button className="group inline-flex items-center justify-center rounded-full  py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-600 text-white hover:bg-indigo-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
          variant="solid"
          color="slate">
          <svg className="fill-current w-4 h-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
    fill="none"><path fillRule="evenodd"
      clipRule="evenodd"
      d="M6 8a1 1 0 0 0 1-1V5.923c0-.459.022-.57.082-.684a.364.364 0 0 1 .157-.157c.113-.06.225-.082.684-.082h10.154c.459 0 .57.022.684.082.07.038.12.087.157.157.06.113.082.225.082.684v12.154c0 .459-.022.57-.082.684a.363.363 0 0 1-.157.157c-.113.06-.225.082-.684.082H7.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V17a1 1 0 1 0-2 0v1.077c0 .76.082 1.185.319 1.627.223.419.558.753.977.977.442.237.866.319 1.627.319h10.154c.76 0 1.185-.082 1.627-.319.419-.224.753-.558.977-.977.237-.442.319-.866.319-1.627V5.923c0-.76-.082-1.185-.319-1.627a2.363 2.363 0 0 0-.977-.977C19.262 3.082 18.838 3 18.077 3H7.923c-.76 0-1.185.082-1.627.319a2.363 2.363 0 0 0-.978.977C5.083 4.738 5 5.162 5 5.923V7a1 1 0 0 0 1 1zm9.593 2.943c.584.585.584 1.53 0 2.116L12.71 15.95c-.39.39-1.03.39-1.42 0a.996.996 0 0 1 0-1.41 9.552 9.552 0 0 1 1.689-1.345l.387-.242-.207-.206a10 10 0 0 1-2.24.254H2.998a1 1 0 1 1 0-2h7.921a10 10 0 0 1 2.24.254l.207-.206-.386-.241a9.562 9.562 0 0 1-1.69-1.348.996.996 0 0 1 0-1.41c.39-.39 1.03-.39 1.42 0l2.883 2.893z"
      fill=""/></svg>
          <span>Sign in</span>

        </button>
        </Link>
    }
<div className='flex justify-center items-center'>
<h5>{auth ? user.name
         : ""}</h5>
         </div>

         {
          isNightMode ? (<div className='flex justify-center items-center'>
          <button onClick={setMode} className="group inline-flex items-center justify-center rounded-full  py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-600 text-white hover:bg-indigo-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
            variant="solid"
            color="slate">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
            </button>
         </div>) : (<div className='flex justify-center items-center'>
          <button onClick={setMode} className="group inline-flex items-center justify-center rounded-full  py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-600 text-white hover:bg-indigo-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
            variant="solid"
            color="slate">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            </button>
         </div>)
         }



        </div>
      </div>
    </nav>
  );
};

export default Navbar;
