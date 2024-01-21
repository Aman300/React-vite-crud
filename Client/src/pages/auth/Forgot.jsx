import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

const validate = values => {
  const errors = {};

  if (!values.userEmail) {
    errors.userEmail = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.userEmail)) {
    errors.userEmail = 'Invalid email address';
  }


  return errors;
};
export default function Forgot() {

  const formik = useFormik({
    initialValues: {
      userEmail: '',
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
          <div className="md:columns-2 columns-1 shadow-md rounded-3xl p-10">
            <div className="flex justify-center items-center md:block hidden">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-3305943-2757111.png?f=webp" alt="" className="w-96 h-96"/>
            </div>
            <div className="text-start px-5">
              <br /><br /><br /><br /><br />
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-medium mb-2">Email</label>
                    <input type="email" id="email" name="userEmail" onChange={formik.handleChange}
                  value={formik.values.userEmail}
                  className={`w-full px-3 py-2 border ${formik.errors.userEmail ? "border-red-500" : "border-gray-300"} border-gray-300 rounded-md focus:outline-none focus:border-indigo-500`}
                />
                {formik.errors.userEmail && <div className="text-red-500">{formik.errors.userEmail}</div>}
                </div>
                <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Submit</button>
                  <div className="text-center mt-5">
                    <p>Or</p>
                    <div className="mt-6">
                    <Link to="/login" className="text-indigo-500 hover:underline"><span className="text-gray-500 mx-2">Don't have an account?</span>Login</Link>
                  </div>
                  </div>

                </form>
            </div>
          </div>
        </div>
     </>
  )
}

