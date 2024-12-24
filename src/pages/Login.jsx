import { useState } from "react";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import { useAppContext } from "../Context";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/login";
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useAppContext();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    let res = await loginUser(formData);
    if (res?.status === 200) {
      console.log(res);

      localStorage.setItem("token", res.data);
      navigate("/login");
    }
    console.log(res.status === 200);
  };
  return (
    <>
      {" "}
      <HeroSection height={"16rem"} heading={"Login"} innerHeight="60vh" />
      {localStorage.getItem("token") ? (
        <div className="text-center text-xl font-semibold h-[40%]">
          User already exists
        </div>
      ) : (
        <div className=" bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-xl sm:text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-8 mx-auto w-[80%] sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      autoComplete="email"
                      required
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign in
                  </button>
                </div>
                <p className="text-center text-red-700">
                  Don't have an account{" "}
                  <Link to="/register">
                    <span className="font-bold cursor-pointer">Register</span>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
