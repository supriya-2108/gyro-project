import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { generateOTP, generateUser } from "../../services/register";
import Step2 from "../../components/Register/Step2";
import Step1 from "../../components/Register/Step1";
const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
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
      console.log(formData.email);

      localStorage.setItem("admintoken", "start");
      navigate("/admin/dashboard");
    }
    console.log(res);
  };

  return (
    <div>
      {" "}
      {localStorage.getItem("admintoken") ? (
        <div className="text-center text-xl font-semibold h-[40%]">
          User already exists
        </div>
      ) : (
        <div className=" flex flex-col justify-center">
          <header className="bg-white shadow-sm">
            <div className="mx-auto py-4 px-6 flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src="/gyro_logo.jpg"
                  alt="Restaurant Logo"
                  width={50}
                  height={30}
                  className="mr-2"
                />
                <h1 className="text-sm font-medium text-gray-900">Gyro Gyro</h1>
              </div>
            </div>
          </header>
          <div className="bg-gray-100 h-[100vh]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-12 text-center text-3xl font-extrabold text-gray-900">
                Sign Up to your account
              </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
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
                  <Link to="/admin/login">
                    {" "}
                    <span className="font-bold">Login</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
