import { Link } from 'react-router-dom';
import './Auth-style.css'
import { useFormik } from 'formik';

const validate = values => {
  const errors = {};

  if (!values.userName) {
    errors.userName = 'Required';
  } else if (values.userName.length > 15) {
    errors.userName = 'Must be 15 characters or less';
  }

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

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      userName: '',
      userEmail: '',
      userPassword: '',
    },
    validate,
    onSubmit: values => {
      // You can replace this with your actual form submission logic
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <div className="flex justify-center items-center h-screen container mx-auto px-4 text-center">
        <div className="md:grid md:grid-cols-2 shadow-md rounded-3xl p-10">
          <div className="flex justify-center items-center md:block hidden">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/login-3305943-2757111.png?f=webp"
              alt=""
              className="w-96 h-96"
            />
          </div>
          <div className="text-start px-5">
            <form onSubmit={formik.handleSubmit}>
              {/* Username Field */}
              <div className="mb-4">
                <label htmlFor="userName" className="block text-gray-600 text-sm font-medium mb-2">
                  User name
                </label>
                <input
                type="text"
                id="userName"
                name="userName"
                onChange={formik.handleChange}
                value={formik.values.userName}
                className={`w-full px-3 py-2 border ${formik.errors.userName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-indigo-500`}
              />
              {formik.errors.userName && <div className="text-red-500">{formik.errors.userName}</div>}
                            </div>

              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="userEmail" className="block text-gray-600 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="userEmail"
                  name="userEmail"
                  onChange={formik.handleChange}
                  value={formik.values.userEmail}
                  className={`w-full px-3 py-2 border ${formik.errors.userEmail ? "border-red-500" : "border-gray-300"} border-gray-300 rounded-md focus:outline-none focus:border-indigo-500`}
                />
                {formik.errors.userEmail && <div className="text-red-500">{formik.errors.userEmail}</div>}
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label htmlFor="userPassword" className="block text-gray-600 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="userPassword"
                  name="userPassword"
                  onChange={formik.handleChange}
                  value={formik.values.userPassword}
                  className={`w-full px-3 py-2 border ${formik.errors.userPassword ? "border-red-500" : "border-gray-300"} border-gray-300 rounded-md focus:outline-none focus:border-indigo-500`}
                />
                {formik.errors.userPassword && (
                  <div className="text-red-500">{formik.errors.userPassword}</div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              >
                Signup
              </button>

              {/* Or Section */}
              <div className="text-center mt-5">
                <p>Or</p>
                <div className="mt-6">
                  <Link to="/login" className="text-indigo-500 hover:underline">
                    <span className="text-gray-500 mx-2">Have an account?</span>Login
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
