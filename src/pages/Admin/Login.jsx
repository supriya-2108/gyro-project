import { useState } from "react";
import { useAppContext } from "../../Context";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/login";
export default function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    email: "",
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
    console.log(formData);

    let res = await loginUser(formData);
    if (res?.status === 200) {
      console.log(res);

      localStorage.setItem("admintoken", res.data.user_info.user_id);
      navigate("/admin/dashboard");
    }
    console.log(res.status === 200);
    if (res?.status !== 200) {
      setError("Invalid password or email");
      console.log(res);
    }
  };
  return (
    <>
      {" "}
      {/* <HeroSection height={"16rem"} heading={"Login"} innerHeight="60vh" /> */}
      {localStorage.getItem("admintoken") ? (
        <div className="text-center text-xl font-semibold h-[40%]">
          User already exists
        </div>
      ) : (
        <div className=" bg-gray-100 flex flex-col justify-center">
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
          <div className="sm:mx-auto  sm:w-full sm:max-w-md">
            <h2 className="mt-12 text-center !text-xl sm:text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-8 mx-auto w-[80%] sm:w-full h-[100vh]  sm:max-w-md">
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
                <p className="text-red-500 text-[0.8rem]">{error}</p>
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
                  <Link to="/admin/register">
                    <span className="font-bold cursor-pointer">Register</span>
                  </Link>
                </p>
                <p className="text-red-700 text-[0.7rem]">{error}</p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
