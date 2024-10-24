import React from 'react'
import AuthLayout from '../../Layout/AuthLayout'
import { useNavigate } from 'react-router-dom';
import PaymentSuccess from "../../../assets/bro.png"
export default function Success() {
  const history = useNavigate();

  const handleBackToHome = () => {
    history.push('/'); // Adjust the path as needed
  };
  return (
    <div className='bg-[#000] p-[10px] h-full min-h-full'>

    <AuthLayout>
   <div className="flex flex-col items-center bg-[#000000] justify-center min-h-screen  p-4">
      <div className=" p-6 text-center">
        <img
          src={PaymentSuccess} 
          alt="Booking Successful"
          className="mb-4 rounded-lg  object-cover mx-auto"
        />
        <h1 className="text-4xl font-semibold text-white mb-4">Your Booking has been Successful</h1>
        <p className="text-[#FFFFFF] mb-4">
          Thank you for placing your booking request with us. We’ve received your request and will confirm you shortly.
        </p>
        <button
          onClick={handleBackToHome}
          className="mt-4 px-6 py-2 bg-[#EB3465] text-white rounded hover:bg-[#EB3465] transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
    </AuthLayout>
    </div>

  )
}
