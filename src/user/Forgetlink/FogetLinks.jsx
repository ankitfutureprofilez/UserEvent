import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Listing from "../../Api/Listing";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function FogetLinks() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const [Regs, setRegs] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const handleInputs = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setRegs((prevState) => ({ ...prevState, [name]: value }));
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [loading, setLoading] = useState(false);

  async function handleForms(e) {
    e.preventDefault();
    if (loading) {
      return false;
    }
    setLoading(true);
    const main = new Listing();
    try {
      const response = await main.ForgetPasswordLink(Regs);
      if (response?.data?.status === true) {
        toast.success(response.data.message);
        toggleModal();
      } else {
        toast.error("invalid email/password");
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      toast.error("invalid Email/password");
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-end ">
        <div
          onClick={toggleModal}
          className=" font-manrope text-[400] text-[18px] text-white text-base text-right cursor-pointer"
        >
          Forget Password
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[96%] max-w-[470px] bg-[#1B191F] rounded-[10px] p-6">
            <div className="absolute top-[10px] right-[10px]">
              <IoCloseSharp
                size={24}
                className="cursor-pointer text-white"
                onClick={toggleModal}
              />
            </div>

            <div className="flex  flex-wrap justify-center">
              <h3 className="text-[24px] font-[700] mb-4 pt-[5px] text-white text-center">
                Reset your password
              </h3>
              <p className="text-[14px] font-[400] mb-4 text-white text-center">
                Enter your email to receive a link to reset your password
              </p>
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-[18px] text-white text-left color-[#2D3344] mb-[10px]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleInputs}
                  value={Regs.email}
                  className="mt-1 block w-full border-none rounded-md p-[15px] bg-[#2D3344] hover:!outline-none hover:!shadow-none focus:!outline-none focus:!shadow-none text-white"
                  placeholder="Enter the Email.."
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleForms}
                  className="w-full bg-[#EB3465] hover:bg-[#fb3a6e]  px-5 py-4 min-w-52 text-white text-base text-center rounded-md"
                >
                  {loading ? "Laoding..." : "Send Link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
