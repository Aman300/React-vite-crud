import "./Style.css";
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const validate = values => {
  const errors = {};

  if (!values.contactName) {
    errors.contactName = 'Required';
  }

  if (!values.contactNumber) {
    errors.contactNumber = 'Required';
  }

  if (!values.address) {
    errors.address = 'Required';
  }
  return errors;
};

export default function Header() {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      contactName: '',
      contactNumber: '',
      address: '',
    },
    validate, // Make sure to define the 'validate' function
    onSubmit: async (values, { setSubmitting, }) => {
        // Show loading state
        setSubmitting(true);
        try {
          let data = await axios.post('/api/v1/create-contact', values);
          if (data.data.status) {
            toast.success(data.data.message);
            navigate('/contact-list');
          } else {
            toast.error(data.data.message);
          }
        } catch (error) {
          alert(error.message);
        }
        // Show success message after submitting
        setSubmitting(false);

    },
  });

        // Show success message after submitting




  return (
    <>
      <div className="flex justify-center items-center mt-20">
          <form className="xl:w-1/3 px-5"  onSubmit={formik.handleSubmit}>
            <input id="contactName" name='contactName' onChange={formik.handleChange}
              className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${formik.errors.contactName ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
              type="text"
              placeholder="Contact name"
            />
            {formik.errors.contactName && <div className="text-red-500">{formik.errors.contactName}</div>}

            <input id="contactNumber" name='contactNumber' onChange={formik.handleChange}
              className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${formik.errors.contactNumber ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
              type="number"
              placeholder="Contact number"
            />
            {formik.errors.contactNumber && <div className="text-red-500">{formik.errors.contactNumber}</div>}

            {/*  */}

            <textarea id="address" name='address' onChange={formik.handleChange}
              className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${formik.errors.address ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
              type="text"
              placeholder="Address"
            />
            {formik.errors.address && <div className="text-red-500 ">{formik.errors.address}</div>}

            {/*  */}

            <button type='submit' className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" disabled={formik.isSubmitting}>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

            {formik.isSubmitting ? 'Submitting...' : 'Submit'}


            </button>
          </form>
      </div>
    </>
  )
}
