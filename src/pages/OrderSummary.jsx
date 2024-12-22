import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAppContext } from "../Context";
import { Link, useNavigate } from "react-router-dom";
import { deleteCartList, getCartList } from "../services/User";

const OrderSummary = () => {
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
    let u_id = userData?.data?.user?._id;

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
  return (
    <div className="">
      <Header backgroundColor={"bg-gray-800 relative"} />
      <h1 className="my-10 ml-36 text-gray-800 text-2xl font-semibold">
        Order Summary
      </h1>
      {foodSummary?.length > 0 ? (
        <>
          {foodSummary &&
            foodSummary?.map((food) => (
              <div className="flex justify-between items-end border-b mx-auto w-[100%]">
                <div className=" w-[50%] flex gap-10 items-start justify-start ml-36">
                  <img
                    src={food.product_details?.[0].image}
                    className="w-[15rem] h-[15rem]"
                  />
                  <div className="mt-10">
                    <h1 className="text-4xl font-semibold">
                      {food.product_details?.[0].name}
                    </h1>
                    <p className="mt-4 mb-2">
                      Ingredients: {food.product_details?.[0].description}
                    </p>
                    <p>Price: ${food.product_details?.[0].price}</p>
                    <p>Add Ons: ${food.product_details?.[0].addOnPrice}.00</p>
                    <p>
                      Special Note: {food.product_details?.[0].specialNote}
                    </p>{" "}
                  </div>
                </div>
                <div>
                  <button
                    className="border border-red-500 text-red-500 p-2 rounded-md"
                    onClick={() => handledeleteItem(food._id)}
                  >
                    Remove Item
                  </button>
                </div>
                <hr className="" />
              </div>
            ))}
          {foodSummary && (
            <div className="w-[50%] ml-36">
              <p className="font-semibold mt-4">
                Total Amount: $
                {foodSummary.reduce((acc, red) => acc + (red.price || 0), 0) +
                  foodSummary.reduce(
                    (acc, red) => acc + (red.addOnPrice || 0),
                    0
                  )}
              </p>
              <button
                className="bg-blue-800 my-5 text-white py-2 px-5 rounded-md"
                onClick={handlePayment}
              >
                Checkout for Payment
              </button>
              {error && (
                <p className="text-red-700 -mt-2 mb-4">
                  Please{" "}
                  <Link to="/login" onClick={() => setError(false)}>
                    <span className="font-semibold cursor-pointer">Login</span>{" "}
                  </Link>
                  to continue
                </p>
              )}{" "}
              {msg && (
                <p className="text-green-700 -mt-2 mb-4">
                  Proceeding to checkout
                </p>
              )}
            </div>
          )}
        </>
      ) : (
        <p className="text-red-500 mb-[25rem] text-left ml-36 -mt-4">
          Cart is empty !!!
        </p>
      )}

      <Footer />
    </div>
  );
};

export default OrderSummary;
