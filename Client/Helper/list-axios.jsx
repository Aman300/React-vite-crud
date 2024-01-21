import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import Testimonials from '../../component/Testimonials'
import { useFormik } from 'formik';
import axios from 'axios'

const validate = values => {
  const errors = {};

  if (!values.userEmail) {
    errors.userEmail = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.userEmail)) {
    errors.userEmail = 'Invalid email address';
  }

  if (!values.userPassword) {
    errors.userPassword = 'Required';
  } else if (values.userPassword.length < 8) {
    errors.userPassword = 'Must be 8 characters or more and contain at least one number and one uppercase letter and one lowercase letter and one special character';
  }

  return errors;
};

export default function BecomeAmentor() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios('https://fakestoreapi.com/products');
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log(data);



  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {

      userEmail: '',
      userPassword: '',
    },
    validate,
    onSubmit: values => {
      // You can replace this with your actual form submission logic
      // alert(JSON.stringify(values, null, 2));
      localStorage.setItem('token', true);
      navigate("/");

    },
  });
  return (
    <>
    <Navbar />

    <div className="text-gray-900 mt-5 p-20">
    <div className=' '>
    <ul role="list" className="grid grid-rows-4 grid-flow-col gap-2">
    {data.map((post) => (
        <li key={post.id}>
           <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                  <blockquote className="relative">
                    <p className="text-sm tracking-tight text-slate-900">
                      {post.description}
                    </p>
                  </blockquote>
                  <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                    <div>
                      <div className="font-display text-base text-slate-900">

                      </div>
                      <div className="mt-1 text-sm text-slate-500">
                        CEO at Lynch LLC
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-full bg-slate-50">
                      <img
                        alt=""
                        loading="lazy"
                        width={56}
                        height={56}
                        decoding="async"
                        data-nimg={1}
                        className="h-14 w-14 object-cover"

                        src={post.image}
                        style={{ color: "transparent" }}
                      />
                    </div>
                  </figcaption>
                </figure>
        </li>
      ))}
            </ul>
            </div>
    </div>
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
    <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <div className="mt-12 flex flex-col items-center">
          <h1 className="text-2xl xl:text-3xl font-extrabold">Become a our mentor</h1>
          <div className="w-full flex-1 mt-8">
            <div className="mx-auto max-w-xs">
            <form onSubmit={formik.handleSubmit}>
              <input id="email" name='userEmail' onChange={formik.handleChange}
                className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${formik.errors.userEmail ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
                type="email"
                placeholder="Email"
              />
              {formik.errors.userEmail && <div className="text-red-500">{formik.errors.userEmail}</div>}

              {/*  */}

              <input id="password" name='userPassword' onChange={formik.handleChange}
                className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${formik.errors.userPassword ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
                type="password"
                placeholder="Password"
              />
              {formik.errors.userPassword && <div className="text-red-500 ">{formik.errors.userPassword}</div>}

              {/*  */}

              <button type='submit' className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                <svg
                  className="w-6 h-6 -ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy={7} r={4} />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span className="ml-3">Sign In</span>
              </button>
             </form>
              <p className="mt-6 text-xs text-gray-600 text-center">
                I agree to abide by templatana's
                <a href="#" className="border-b border-gray-500 border-dotted">
                  Terms of Service
                </a>
                and its
                <a href="#" className="border-b border-gray-500 border-dotted">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

    <Testimonials />
    <Footer />
    </>
  )
}
