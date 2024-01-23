import React from 'react'
import Navbar from '../../component/Navbar'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
// import ReactPaginate from 'react-paginate';

const totalPagesCalculator = (total, limit) => {
  const pages = Math.ceil(total / limit);
  return Array.from({ length: pages }, (_, index) => index + 1);
};


export default function Contact() {

  const navigate = useNavigate();

  const [dataContact, setDataContact] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isUpdateData, setIsUpdateData] = React.useState(false);

  const [activePage, setActivePage] = React.useState(1);
  const [totalUsers, setTotalUsers] = React.useState(0);




  const LIMIT = 3;
  totalPagesCalculator(totalUsers, LIMIT);




  React.useEffect(() => {
    fetchData(activePage);
  }, [activePage]); // The empty dependency array ensures that the effect runs only once on mount

  const fetchData = async (activePage) => {
    try {
      const response = await fetch(`/api/v1/get-contact?page=${activePage}&size=${LIMIT}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      setDataContact(data.data);
      setTotalUsers(data.total);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
        fetch(`/api/v1/delete-contact/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status) {
              toast.success(data.message);
              fetchData();
            } else {
              alert(data.message);
            }
          })
          .catch((err) => {
            alert(err.message);
          });
        };
  const handleUpdate = async (id) => {
    try{
      let data = await axios.get(`/api/v1/get-single-contact/${id}`);
      console.log(data);
      if(data.data.status){
        setIsUpdateData(true);
        formik.setFieldValue('contactName', data.data.data.contactName);
        formik.setFieldValue('contactNumber', data.data.data.contactNumber);
        formik.setFieldValue('address', data.data.data.address);
        formik.setFieldValue('id', data.data.data._id);
      }
      else{
        toast.error(data.data.message);
      }

    }catch(e){
      alert(e)
    }
  }

  const formik = useFormik({
    initialValues: {
      contactName: '',
      contactNumber: '',
      address: '',
      id: ''
    },
    // validate, // Make sure to define the 'validate' function
    onSubmit: async (values, { setSubmitting, }) => {
        // Show loading state
        setSubmitting(true);
        try {
          let data = await axios.put(`/api/v1/update-contact/${formik.values.id}`, values);
          if (data.data.status) {
            toast.success(data.data.message);
            fetchData();
          } else {
            toast.error(data.data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
        // Show success message after submitting
        setSubmitting(false);
        setIsUpdateData(false);
        formik.resetForm();

    },
  });

  const searchContach = async (value) => {
    try{
      let data = await axios.get(`/api/v1/search-contact/${value}`);
      console.log(data);
      if(data.data.status){
        setDataContact(data.data.data);
        console.log(data.data.data);
      }
      else{
        fetchData(1);
      }

    }catch(e){
      alert(e)
    }
    };


  return (
    <>
    <Navbar />

    <div className="container mx-auto px-4 sm:px-8">







    <div className="flex justify-center items-center mt-20">
          <form className="xl:w-1/3 px-5" >
            <input id="contactName" name='contactName' onChange={(e)=> searchContach(e.target.value)}
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
              type="text"
              placeholder="Search..."
            />
          </form>
      </div>
      <div className="py-8">
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gray-100">
          <th className="w-1/1 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              SNo.
            </th>
            <th className="w-1/1 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Contact Name
            </th>
            <th className="w-1/1 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Contact Number
            </th>
            <th className="w-1/1 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Address
            </th>
            <th className="w-1/1 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Action
            </th>
          </tr>
        </thead>
      <tbody className="bg-white">

      {dataContact.length > 0 ? (
        dataContact.map((item, index) => (
            <tr key={item._id}>
              <td className="py-4 px-6 border-b border-gray-200">
              {(activePage - 1) * LIMIT + index + 1}
            </td>
              <td className="py-4 px-6 border-b border-gray-200">{item.contactName}</td>
              <td className="py-4 px-6 border-b border-gray-200 truncate">
              {item.contactNumber}
              </td>
              <td className="py-4 px-6 border-b border-gray-200">{item.address}</td>
              <td className="xl:py-4 xl:px-1 border-b border-gray-200">
              <button onClick={() => handleUpdate(item._id)} className='space-x-4'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
              </button>
              <button onClick={() => handleDelete(item._id)} className='ml-5'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              </button>
              </td>
            </tr>
          ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 px-6 border-b border-gray-200 text-center">
                No data available
              </td>
            </tr>
          )}

      </tbody>
      </table>
      </div>
      </div>
    </div>
    </div>
    <ol className="flex justify-center text-xs font-medium space-x-1">
      {activePage !== 1 && (
      <li className="page-item">
          <a className="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded"
          onClick={() => setActivePage(activePage - 1)}
          href="javascript:void(null)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg></a>
      </li>
      )}
      {totalPagesCalculator(totalUsers, LIMIT).map(page => (
        <li >
          <a
            className={`block w-8 h-8 text-center border border-gray-100 rounded leading-8 ${activePage === page ? 'text-white bg-indigo-600 border-indigo-600' : ''}`} key={page}
            href="javascript:void(null)"
            onClick={() => setActivePage(page)}
          >
            {page}
          </a>
        </li>
      ))}
      {activePage !== totalPagesCalculator(totalUsers, LIMIT).length && (
        <li className="page-item">
          <a className="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded"
          onClick={() => setActivePage(activePage + 1)}
          href="javascript:void(null)" >
          <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
          </a>
        </li>
      )}
    </ol>

    {/* get single data form */}
    {/* need to open in diglog this form */}
    {isUpdateData && (
    <div className="flex justify-center items-center mt-20">
          <form className="xl:w-1/3 px-5"  onSubmit={formik.handleSubmit}>
            <input id="contactName" name='contactName' value={formik.values.contactName} onChange={formik.handleChange}
              className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${formik.errors.contactName ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
              type="text"
              placeholder="Contact name"
            />
            {formik.errors.contactName && <div className="text-red-500">{formik.errors.contactName}</div>}

            <input id="contactNumber" name='contactNumber' value={formik.values.contactNumber} onChange={formik.handleChange}
              className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${formik.errors.contactNumber ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
              type="number"
              placeholder="Contact number"
            />
            {formik.errors.contactNumber && <div className="text-red-500">{formik.errors.contactNumber}</div>}

            {/*  */}

            <textarea id="address" name='address' value={formik.values.address} onChange={formik.handleChange}
              className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${formik.errors.address ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
              type="text"
              placeholder="Address"
            />
            {formik.errors.address && <div className="text-red-500 ">{formik.errors.address}</div>}

            {/*  */}

            <button type='submit' className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" disabled={formik.isSubmitting}>

            {formik.isSubmitting ? 'Updating...' : 'Update'}
            </button>
          </form>
      </div>
    )}


    </>
  )
}
