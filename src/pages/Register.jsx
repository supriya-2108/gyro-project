import { useState } from "react";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import { useAppContext } from "../Context";
import { Link, useNavigate } from "react-router-dom";
import { generateOTP, generateUser } from "../services/register";
import Step2 from "../components/Register/Step2";
import Step1 from "../components/Register/Step1";
const AdminRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { user, setUser } = useAppContext();
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    number: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await generateOTP({ email: formData.email });
    if (res?.status === 200) {
      setStep(2);
    }
    console.log(res);
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    let res = await generateUser(formData);
    if (res?.status == 200) {
      let data = res?.data?.user?._id;
      localStorage.setItem("token", JSON.stringify(data));
      navigate("/");
    }
    console.log(res);
  };

  return (
    <div>
      {" "}
      <HeroSection height={"16rem"} heading={"Register"} innerHeight="60vh" />
      {localStorage.getItem("token") ? (
        <div className="text-center text-xl font-semibold h-[40%]">
          User already exists
        </div>
      ) : (
        <div className=" bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-xl md:text-3xl font-extrabold text-gray-900">
              Sign Up to your account
            </h2>
          </div>

          <div className="mt-8 max-sm:w-[80%] mx-auto sm:w-full ">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              {step === 1 ? (
                <Step1
                  value={formData.email}
                  handleSubmit={handleSubmit}
                  handleInputChange={handleInputChange}
                />
              ) : (
                <Step2
                  handleSubmit={handleSubmit1}
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}
              <p className="text-center text-md text-red-600 mt-4">
                If you already have an account{" "}
                <Link to="/login">
                  {" "}
                  <span className="font-bold">Login</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AdminRegister;
