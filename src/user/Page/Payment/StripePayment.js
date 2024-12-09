import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Listing from "../../../Api/Listing";
import { useParams } from "react-router-dom";
import AuthLayout from "../../Layout/AuthLayout";
import moment from "moment";
import productimage from "../../../assets/product.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Popup from "../../compontents/Popup";
import LoginLogic from "../SignUp/LoginLogic";
import { FaDollarSign, FaEuroSign, FaPoundSign } from "react-icons/fa";
import { TbCurrencyDirham } from "react-icons/tb";
const StripePayment = () => {
  const [data, setData] = useState(false);
  // console.log(data);
  const token = localStorage && localStorage.getItem("token");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [processing, setprocessing] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  const { id } = useParams();
  const handlePayment = async () => {
    try {
      setprocessing(true);
      const payment = new Listing();
      const resp = payment.Stripe_payment({
        amount: data?.totalPrice,
        userId: data?.userId,
        booking_id: data?._id,
        currency: data?.CurrencyCode || "USD",
      });
      resp
        .then((res) => {
          if (res.data.url) {
            window.location.href = res.data.url;
          }
          setprocessing(false);
        })
        .catch((err) => {
          console.log("err", err);
          toast.error(err?.response?.data?.error);
          setprocessing(false);
        });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error during payment");
      setprocessing(false);
    }
  };

  const fetch = (id) => {
    const main = new Listing();
    main
      .getBookingByID(id)
      .then((r) => {
        setData(r?.data?.packageRecord);
      })
      .catch((err) => {
        setData([]);
        console.log("error", err);
      });
  };

  const fetchPaymentStatus = (id) => {
    const main = new Listing();
    main
      .getPaymentByID(id)
      .then((r) => {
        setIsPaymentDone(r?.data?.payment);
      })
      .catch((err) => {
        setIsPaymentDone(false);
        console.log("error", err);
      });
  };

  useEffect(() => {
    if (id) {
      fetch(id);
      fetchPaymentStatus(id);
    }
  }, []);

  const priceText = {
    1: "Budget-friendly place",
    2: "Mid-range place",
    3: "Higher-end place",
    4: "Luxury and premium option",
  };

  const currencySymbol = {
    USD: <FaDollarSign size={18} />,
    EUR: <FaEuroSign size={18} />,
    AED: <TbCurrencyDirham size={18} />,
    GBP: <FaPoundSign size={18} />,
  };

  return (
    <div className="bg-[#000] p-[10px] h-full min-h-full">
      <AuthLayout>
        <div className="w-full max-w-[1300px] m-auto mt-[40px] md:mt-[60px] lg:mt-[70px]">
          <div className="flex items-start justify-between flex-wrap lg:flex-nowrap gap-[30px] ">
            <div className="w-full lg:max-w-[720px]">
              <h2 className="flex items-center gap-[5px] mb-[15px] font-manrope font-[700] text-[18px] leading-[20px] md:text-[22px] lg:text-[24px] text-white">
                <button>
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.4999 8.50006L3.91394 8.50006L8.41394 13.0001L6.99994 14.4141L0.0859372 7.50006L6.99994 0.586063L8.41394 2.00006L3.91394 6.50006L15.4999 6.50006L15.4999 8.50006Z"
                      fill="white"
                    />
                  </svg>
                </button>{" "}
                Selected services for your event
              </h2>
              <div className="">
                {data?.package?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between flex-wrap sm:flex-nowrap gap-[10px] md:gap-[20px] border-b border-b-[#ffffff42] py-[15px]"
                  >
                    <div className="flex items-center flex-wrap md:flex-nowrap gap-[10px] md:gap-[20px] w-full sm:max-w-[300px]   md:max-w-[400px]">
                      <div className="w-full min-w-[80px] max-w-[110px]">
                        {item?.services_provider_name ? (
                          <img
                            src={
                              item?.services_provider_image
                                ? item.services_provider_image
                                : productimage
                            }
                            alt="img"
                            className="border-none rounded-[4px]"
                          />
                        ) : (
                          <img
                            src={productimage}
                            alt="img"
                            className="border-none rounded-[4px]"
                          />
                        )}
                      </div>
                      <div className="w-full max-w-[180px] md:max-w-[260px] lg:max-w-[260px] xl:max-w-[380px]">
                        <h2 className="font-manrope font-[300] text-[14px] text-[#E69536] uppercase">
                          {item?.package_categories?.join(",")}
                        </h2>
                        <h3 className="font-manrope text-[#fff] font-[700] text-[16px] leading-[22px] md:text-[16px] md:leading-[23px] lg:text-[18px] lg:leading-[22px] xl:text-[20px] xl:leading-[26px] text-[#fff]">
                          {item?.services_provider_name
                            ? item?.services_provider_name
                            : item?.name}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-[20px] lg:gap-[50px] w-[100%] md:w-auto">
                      <div>
                        <h2 className="font-manrope font-[700] text-[18px]  text-[#fff]">
                          $
                          {item?.services_provider_name
                            ? ` 
                              
                          ${item?.services_provider_price}`
                            : priceText[item?.price_level] || "N/A"}
                        </h2>
                        <h2 className="font-manrope font-[400] text-[10px] lg:text-[12px] text-[#EB3465]">
                          *Estimated Budget
                        </h2>
                      </div>
                      {/* <button
                        className="cursor-pointer"
                        onClick={() => dispatch(removeVenue(item?.place_id))}
                      >
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.89683 0.783496L9.38795 7.21683L15.8454 0.816829C15.9881 0.666359 16.1599 0.545987 16.3506 0.462933C16.5413 0.379879 16.747 0.335853 16.9553 0.333496C17.4013 0.333496 17.829 0.509091 18.1444 0.821651C18.4598 1.13421 18.6369 1.55814 18.6369 2.00016C18.6409 2.2045 18.6026 2.40747 18.5245 2.59663C18.4465 2.78579 18.3302 2.95714 18.1829 3.10016L11.6413 9.50016L18.1829 15.9835C18.4601 16.2522 18.6226 16.6161 18.6369 17.0002C18.6369 17.4422 18.4598 17.8661 18.1444 18.1787C17.829 18.4912 17.4013 18.6668 16.9553 18.6668C16.741 18.6756 16.5272 18.6402 16.3274 18.5627C16.1277 18.4853 15.9464 18.3675 15.795 18.2168L9.38795 11.7835L2.91365 18.2002C2.77156 18.3456 2.60181 18.4617 2.4142 18.5418C2.2266 18.6219 2.02484 18.6644 1.82058 18.6668C1.37458 18.6668 0.946853 18.4912 0.631485 18.1787C0.316117 17.8661 0.138945 17.4422 0.138945 17.0002C0.135025 16.7958 0.173277 16.5929 0.251354 16.4037C0.329432 16.2145 0.445688 16.0432 0.592987 15.9002L7.13455 9.50016L0.592987 3.01683C0.315828 2.74809 0.153306 2.38418 0.138945 2.00016C0.138945 1.55814 0.316117 1.13421 0.631485 0.821651C0.946853 0.509091 1.37458 0.333496 1.82058 0.333496C2.22417 0.338496 2.61095 0.500163 2.89683 0.783496Z"
                            fill="white"
                          />
                        </svg>
                      </button> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:max-w-[420px] bg-[#1B1B1B] rounded-[15px] p-[15px] lg:rounded-[20px] lg:p-[25px]">
              <div className="flex justify-center mb-[15px] text-center">
                <iframe
                  src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(
                    `${data?.location} )`
                  )}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                  width="100%"
                  height="200"
                  style={{ border: "0" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map"
                ></iframe>
              </div>
              <div className="border-b border-b-[#ffffff42] mt-[30px] pb-[15px]">
                <h2 className="mb-[10px] lg:mb-[15px] font-manrope font-[600] text-[14px] lg:text-[16px] text-[#EB3465]">
                  Address of your event
                </h2>
                <h3 className="font-manrope font-[400] text-[18px] leading-[22px] lg:text-[18px] lg:leading-[24px] text-[#fff]">
                  {data?.location}
                </h3>
              </div>
              <div className="grid grid-cols-12 gap-[10px] border-b border-b-[#ffffff42] mt-[10px] pb-[10px]">
                <div className="col-span-12 lg:col-span-5">
                  <h2 className="mb-[8px] lg:mb-[15px] font-manrope font-[600] text-[13px] lg:text-[16px] text-[#EB3465]">
                    Date
                  </h2>
                  <h3 className="font-manrope font-[400] text-[15px] leading-[20px] lg:text-[18px] lg:leading-[25px] xl:text-[18px] xl:leading-[20px] text-[#fff]">
                    {moment(data?.bookingDate).format("MMMM Do, YYYY")}
                  </h3>
                  {/*  */}
                </div>

                <div className="col-span-12 lg:col-span-7">
                  <h2 className="mb-[8px] lg:mb-[15px] font-manrope font-[600] text-[16px] text-[#EB3465]">
                    Number of attendees
                  </h2>
                  <h3 className="font-manrope font-[400] text-[20px] leading-[24px] text-[#fff]">
                    {data?.attendees}
                  </h3>
                </div>
              </div>

              <div className="border-b border-b-[#ffffff42] mt-[10px] pb-[10px]">
                <h2 className="mb-[10px] font-manrope font-[600] text-[18px] lg:text-[20px] text-[#EB3465]">
                  Estimated Price Details
                </h2>
                <div className="flex items-center justify-between mb-[15px]">
                  <h2 className="font-manrope text-[14px] lg:text-[16px] text-white">
                    Sub Total
                  </h2>
                  <h3 className="font-manrope text-[16px] lg:text-[18px] text-white flex items-center">
                    {data?.totalPrice !== 0 ? (
                      <>
                        {currencySymbol[data?.CurrencyCode]} {data?.totalPrice}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-between mt-[10px] pb-[10px]">
                <h2 className="font-manrope text-[20px] text-white">Total</h2>
                <h3 className="font-manrope text-[16px] lg:text-[18px] text-white flex items-center">
                  {data?.totalPrice !== 0 ? (
                    <>
                      {currencySymbol[data?.CurrencyCode]} {data?.totalPrice}
                    </>
                  ) : (
                    "N/A"
                  )}
                </h3>
              </div>
              <div className="flex justify-end mt-[10px]">
                {isPaymentDone ? (
                  <p className="font-manrope text-[18px] lg:text-[20px] text-[#a1a1a1] mt-3  font-bold">
                    Payment already done!
                  </p>
                ) : (
                  <button
                    onClick={() => {
                      if (token) {
                        handlePayment();
                      } else {
                        // Open popup
                        openPopup();
                      }
                    }}
                    className="px-[25px] py-[12px] xl:px-[30px] xl:py-[15px] bg-[#ff0062] hover:bg-[#4400c3] font-manrope font-[500] text-[16px] lg:text-[18px] text-white rounded-[5px]"
                  >
                    {processing ? "Processing.." : "Pay Now"}
                  </button>
                )}
              </div>
              <Popup
                isOpen={isPopupOpen}
                onClose={closePopup}
                title="Welcome!"
                content={<LoginLogic isPopup={true} onClose={closePopup} />}
              />
            </div>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
};

export default StripePayment;
