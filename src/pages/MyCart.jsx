import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAppContext } from "../Context";
import { Link, useNavigate } from "react-router-dom";
import { deleteCartList, getCartList } from "../services/User";

const MyCart = () => {
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
                <div className="flex  max-sm:flex-col md:justify-between md:items-end  mx-auto md:w-[100%]">
                  <div className=" w-[80%] rounded-md mx-auto md:w-[50%] flex  max-sm:flex-col md:gap-10 md:items-start md:justify-start md:ml-36">
                    <img
                      src={food.product_details?.[0].image}
                      className="h-[10rem] object-cover rounded-md md:w-[15rem] md:h-[15rem]"
                    />
                    <div className=" mt-2 md:mt-10">
                      <h1 className="text-2xl md:text-4xl font-semibold">
                        {food.product_details?.[0].name}
                      </h1>
                      <p className="md:mt-4 mb-2 max-sm:text-sm">
                        Ingredients: {food.product_details?.[0].description}
                      </p>
                      <p>Price: ${food.product_details?.[0].price}</p>
                      <p>Add Ons: ${food.product_details?.[0].addOnPrice}.00</p>
                      <p>
                        Special Note: {food.product_details?.[0].specialNote}
                      </p>{" "}
                    </div>
                  </div>
                  <div className="max-sm:flex ml-10 my-5">
                    <button
                      className="border border-red-500 text-red-500 p-1 md:p-2 rounded-md"
                      onClick={() => handledeleteItem(food._id)}
                    >
                      Remove Item
                    </button>
                  </div>
                  <hr className="max-sm:my-4" />
                </div>
              ))}
            {foodSummary && (
              <div className="w-[50%] ml-10">
                <p className="font-semibold mt-4">
                  Total Amount: $
                  {foodSummary.reduce(
                    (acc, red) =>
                      acc + red.product_details[0]?.price * red.quantity,
                    0
                  ) +
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
                      <span className="font-semibold cursor-pointer">
                        Login
                      </span>{" "}
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
        )
      ) : (
        <p>Loading...</p>
      )}

      <Footer />
    </div>
  );
};

export default MyCart;
