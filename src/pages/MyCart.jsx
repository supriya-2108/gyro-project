import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAppContext } from "../Context";
import { Link, useNavigate } from "react-router-dom";
import { deleteCartList, getCartList } from "../services/User";

const MyCart = () => {
  const navigate = useNavigate();
  const [foodSummary, setFoodSummary] = useState();
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState(false);
  const { user } = useAppContext();
  const handlePayment = () => {
    if (!localStorage.getItem("token")) {
      setError(true);
    } else {
      setMsg(true);
    }
  };

  const getCartItems = async () => {
    let userData = JSON.parse(localStorage.getItem("token"));
    if (!userData) {
      navigate("/login");
    }
    let u_id = userData;

    let res = await getCartList({ user_id: u_id });
    console.log(res);
    if (res?.status == 200) {
      setFoodSummary(res.data.cart);
    }
  };
  const handledeleteItem = async (id) => {
    let res = await deleteCartList(id);
    if (res?.status == 200) {
      getCartItems();
    }
  };
  useEffect(() => {
    getCartItems();
  }, []);
  console.log(foodSummary);

  return (
    <div className="">
      <Header backgroundColor={"bg-gray-800 relative"} />
      <h1 className="my-10 ml-36 text-gray-800 text-2xl font-semibold">
        Order Summary
      </h1>
      {foodSummary ? (
        foodSummary?.length > 0 ? (
          <>
            {foodSummary &&
              foodSummary?.map((food) => (
                <div className="flex  max-sm:flex-col md:justify-between md:items-end mb-12 md:w-[80%]">
                  <div className=" w-[80%] rounded-md mx-auto md:w-[80%] flex  max-sm:flex-col md:gap-10 md:items-start md:justify-start md:ml-36">
                    <img
                      src={food.product_details?.[0].image}
                      className="h-[10rem] object-cover rounded-md md:w-[20rem] md:h-[20rem]"
                    />
                    <div className=" mt-2 md:mt-10">
                      <h1 className="text-2xl md:text-4xl font-semibold">
                        {food.product_details?.[0].name}
                      </h1>
                      <p className="md:mt-4 mb-2 text-gray-700 font-medium max-sm:text-sm">
                        Ingredients: {food.product_details?.[0].description}
                      </p>
                      <p className="text-gray-600 text-[0.9rem] font-medium mt-4 mb-1">
                        Price: ${food.product_details?.[0].price}
                      </p>
                      <p className="text-gray-600 text-[0.9rem] font-medium mb-1">
                        Tax : $
                        {(food.product_details?.[0].price * 0.08238).toFixed(2)}
                        %
                      </p>
                      <p className="text-gray-600 text-[0.9rem] font-medium mb-1">
                        Add Ons: ${food.product_details?.[0].addOnPrice}
                      </p>
                      <p className="text-gray-600 text-[0.9rem] font-medium mb-1">
                        Total : $
                        {(
                          food.product_details?.[0].price +
                          food.product_details?.[0].price * 0.08238
                        ).toFixed(2)}
                      </p>
                      <p className="text-gray-600 text-[0.9rem] font-medium mb-1">
                        Special Note: {food.product_details?.[0].specialNote}
                      </p>{" "}
                    </div>
                  </div>
                  <div className="max-sm:flex ml-10 my-5">
                    <button
                      className="border border-red-500 text-red-500 p-1 md:p-2 rounded-md"
                      onClick={() => handledeleteItem(food._id)}
                    >
                      Remove
                    </button>
                  </div>
                  <hr className="max-sm:my-4" />
                </div>
              ))}
            {foodSummary && (
              <div className="w-[80%] flex justify-end ml-10 border-b">
                <div>
                  <p className="font-semibold mt-4">
                    Total Amount: $
                    {(
                      foodSummary.reduce(
                        (acc, red) =>
                          acc +
                          (
                            red.product_details[0]?.price +
                            red.product_details[0]?.price * 0.0832
                          ).toFixed(2) *
                            red.quantity,
                        0
                      ) +
                      foodSummary.reduce(
                        (acc, red) => acc + (red.addOnPrice || 0),
                        0
                      )
                    ).toFixed(2)}
                  </p>
                  {!msg && (
                    <button
                      className="bg-blue-800 my-5 text-white py-2 px-5 rounded-md"
                      onClick={handlePayment}
                    >
                      Checkout for Payment
                    </button>
                  )}
                </div>
                {error && (
                  <p className="text-red-700 -mt-2 mb-4">
                    Please{" "}
                    <Link to="/login" onClick={() => setError(false)}>
                      <span className="font-semibold cursor-pointer">
                        Login
                      </span>{" "}
                    </Link>
                    to continue
                  </p>
                )}{" "}
                {msg && (
                  <Link to="/checkout">
                    <button className="bg-green-700 text-white p-2 rounded-md mx-5">
                      Proceeding to checkout
                    </button>
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          <p className="text-red-500 mb-[25rem] text-left ml-36 -mt-4">
            Cart is empty !!!
          </p>
        )
      ) : (
        <p>Loading...</p>
      )}

      <Footer />
    </div>
  );
};

export default MyCart;
