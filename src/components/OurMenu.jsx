"use client";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Utensils, Candy, Wine } from "lucide-react";
import CustomModal from "./CustomModal";
import { Link, useNavigate } from "react-router-dom";
import { addOns } from "../constants/MenuItem";
import { addProductToCart, getProductListForUser } from "../services/User";

export default function OurMenu({ type }) {
  const [foodItems, setFoodItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([
    "GYROS",
    "BOWLS",
    "SPECIALS",
    "PITA PIZZAS ",
    "SALADS",
    "APPETIZERS",
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // To toggle dropdown visibility
  const [addOnsList, setAddOnsList] = useState([]);
  const [activeTitle, setActiveTitles] = useState([]);
  const [activeTab, setActiveTab] = useState(categories[0] || "");
  const [foodItem, setFoodItem] = useState({
    title: "",
    image: "",
    description: "",
    price: 0,
    specialNote: "",
    addOns: [],
    addOnPrice: 0,
    quantity: 1, // Add a default quantity here
  });

  const handleQuantityChange = (e) => {
    console.log(e.target.value);

    setFoodItem((prev) => ({
      ...prev,
      quantity: parseInt(e.target.value), // Update quantity as a number
    }));
  };

  const getFoodList = async () => {
    let res = await getProductListForUser();
    console.log(res?.data?.products);
    if (res?.status == 200) {
      setFoodItems(res?.data?.products);
      setAllItems(res?.data?.products);
      // const uniqueCategories = [
      //   ...new Set(res?.data?.products?.map((item) => item.category)),
      // ];
      // setCategories(uniqueCategories);
    }
  };
  useEffect(() => {
    getFoodList();
    AOS.init();
    AOS.refresh();
    const pendingProduct = localStorage.getItem("pendingProduct");
    const modalState = localStorage.getItem("modalOpen");
    const addOnList = localStorage.getItem("addOnList");
    if (pendingProduct && pendingProduct !== "undefined") {
      setFoodItem(JSON.parse(pendingProduct)); // Restore item
      setAddOnsList(JSON.parse(addOnList));
      localStorage.removeItem("addOnList");
      localStorage.removeItem("pendingProduct");
    }

    if (modalState === "true") {
      setIsModalOpen(true); // Reopen modal
      localStorage.removeItem("modalOpen");
    }
  }, []);

  const openModal = (item) => {
    setIsModalOpen(true);
    console.log(item);
    setFoodItem({
      title: item.name,
      Product: item._id,
      image: item.image,
      description: item.description,
      price: item.price,
    });
  };
  const openModalForSubMenu = (item) => {
    //   /  setIsModalOpen(true);
    console.log(item);
    setAddOnsList((prev) => [...prev, item]);
    setFoodItem((prev) => ({
      ...prev,
      addOns: Array.isArray(prev.addOns)
        ? [...prev.addOns, item.title]
        : [item.title],
      addOnPrice: prev.addOnPrice + item.price,
    }));
  };

  const handleCategoryChange = (category) => {
    const trimmedCategory = category.trim().toLowerCase(); // Trim and convert to lowercase
    setActiveTab(trimmedCategory);
    const filteredItems = allItems?.filter(
      (item) => item.category.trim().toLowerCase() === trimmedCategory // Apply trimming and lowercase here as well
    );
    console.log(filteredItems);
    setFoodItems(filteredItems);
  };
  const handleSubmit = async () => {
    let userData = JSON.parse(localStorage.getItem("token"));
    if (!userData) {
      localStorage.setItem("pendingProduct", JSON.stringify(foodItem));
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      localStorage.setItem("addOnList", JSON.stringify(addOnsList));
      localStorage.setItem("modalOpen", "true");
      window.location.href = "/login";
    }
    let u_id = userData;

    let data = {
      product_id: foodItem.Product,
      user_id: u_id,
      quantity: foodItem?.quantity ? foodItem?.quantity : 1,
      add_on: addOnsList,
      special_note: foodItem.specialNote,
    };
    console.log(foodItem.addOns);
    let res = await addProductToCart(data);
    console.log(res);
    if (res?.status == 200) {
      navigate("/mycart");
      setActiveTitles((prev) => [...prev, foodItem.title]);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      className="container w-full !overflow-hidden mx-auto bg-[#f9f9f9] px-4 py-12 bg-opacity-10"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/food-cooking-background-stone-texture-with-sea-salt-pepper-garlic-parsley-light-grey-abstract-food-background-empty-space-text-can-be-used-food-posters-design-menu-top-view_253362-16400.jpg?w=2000')",
        backgroundSize: "cover", // Adjust to "contain" if needed
        backgroundPosition: "center", // Adjust position as needed
        backgroundRepeat: "no-repeat", // Avoid repeating the image
      }}
      s
    >
      {type && (
        <>
          <p className="text-center text-2xl font-bold mt-16">
            You've choosen {localStorage.getItem("mode")?.toUpperCase()}
          </p>
          {localStorage.getItem("mode")?.toUpperCase() == "DINE-IN" && (
            <div className="flex justify-center gap-3 items-center my-2">
              <p>Enter no. of people</p>
              <input className="border h-7 p-2 rounded-md" placeholder="0" />
              <button className="bg-[#009dc4] text-white p-1 cursor-pointer rounded-md">
                Send
              </button>
            </div>
          )}
        </>
      )}
      {!type && (
        <div className="text-center mt-8">
          <h1 className="text-5xl md:text-8xl text-[#009dc4] mb-2 font-greatVibes">
            Specialties
          </h1>
          <h1 className=" text-3xl md:text-5xl font-bold text-[#3d3b3a] -mt-9 md:-mt-12">
            Our Menu
          </h1>
        </div>
      )}
      <div className="max-sm:my-6 md:flex gap-y-2 gap-x-3 md:gap-6 justify-center w-full md:my-7">
        <div className="hidden max-sm:hidden md:flex gap-3">
          {categories ? (
            categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryChange(category)}
                className={`flex items-center gap-2 py-1 px-3 md:px-6 md:py-3 rounded-lg transition-colors ${
                  activeTab === category
                    ? "bg-[#3d3b3a] text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {category === "main" && <Utensils className="w-4 h-4" />}
                {category === "dessert" && <Candy className="w-4 h-4" />}
                {category === "drinks" && <Wine className="w-4 h-4" />}
                <span>
                  {category?.charAt(0)?.toUpperCase() + category?.slice(1)}
                </span>
              </button>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="relative w-full max-sm:block md:hidden">
          <div
            className="w-full p-2 rounded-lg border bg-gray-100 text-gray-700 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1) ||
              "Select a category"}
            <span className="float-right">&#9662;</span>
          </div>
          {isDropdownOpen && (
            <ul className="absolute w-full mt-1 bg-white border rounded-lg shadow-md z-10">
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <li
                    key={index}
                    className={`p-2 cursor-pointer hover:bg-gray-200 ${
                      activeTab === category ? "bg-gray-100 font-bold" : ""
                    }`}
                    onClick={() => handleCategoryChange(category)} // Handle category selection
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">Loading...</li>
              )}
            </ul>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 md:w-[85%] mx-auto gap-y-4">
        {foodItems ? (
          foodItems.length > 0 &&
          foodItems?.map((item, index) => (
            <div
              key={index}
              className={`flex max-sm:flex-col cursor-pointer rounded-md items-center bg-white w-[100%] h-[22rem] md:h-[15rem] shadow-xl ${
                activeTitle.includes(item.name)
                  ? "border border-[#3d3b3a] !shadow-2xl bg-[#c8a97e]"
                  : ""
              } ${
                Math.floor(index / 2) % 2 === 0
                  ? "flex-row"
                  : "flex-row-reverse"
              }`} // Alternate layout for rows
              data-aos={
                !activeTitle.includes(item.name)
                  ? index % 2 === 0
                    ? "fade-right"
                    : "fade-left"
                  : ""
              } // Skip animation for active items
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-[100%] md:w-[35%] h-[10rem] md:h-full object-cover"
              />
              <div className="flex px-6 gap-5 py-3">
                <div className="flex flex-col gap-2 justify-between items-start ">
                  <h3 className="font-bold text-lg md:text-xl text-gray-800">
                    {item.name}
                  </h3>{" "}
                  <p className="text-muted-foreground text-[0.7rem] md:text-md mt-1">
                    {item?.description}
                  </p>
                  <button
                    className="bg-[#3d3b3a]  text-white px-3 py-2"
                    onClick={() => {
                      openModal(item);
                    }}
                  >
                    Order now{" "}
                  </button>
                </div>
                <span className="text-2xl font-semibold text-[#009dc4]">
                  ${item.price}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={foodItem.title}
      >
        <div className="h-[10rem] md:h-[20rem] w-full bg-red-300">
          {" "}
          <img
            src={foodItem.image}
            className="object-cover h-full w-full"
          />{" "}
        </div>

        <button
          variant="ghost"
          size="icon"
          className="absolute top-5 right-5 bg-gray-500 rounded-full h-10 w-10 items-center justify-center flex"
          onClick={closeModal}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </button>
        <div className="mx-5">
          <h1 className="font-semibold text-gray-800 text-xl capitalize my-2 md:my-4">
            {foodItem.title}
          </h1>
          <div className="text-gray-700 md:text-lg max-h-[5rem] md:max-h-[3rem] overflow-y-scroll">
            {foodItem.description}
          </div>
          <p className="my-3">Price: ${foodItem.price}</p>
          <p>
            QTY:{" "}
            <select
              name=""
              id=""
              value={foodItem.quantity} // Bind value to state
              onChange={handleQuantityChange}
              className="bg-gray-400 h-8 text-white rounded-md px-1 w-10"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </p>
          <div
            className={`flex justify-between items-center border-b border-gray-300 p-2`}
          ></div>
          <p className="text-gray-800 my-4 text-lg font-semibold">Add Ons</p>
          <div className="grid md:grid-cols-2 mx-auto gap-5">
            {addOns?.map((item, index) => (
              <div
                className={`flex cursor-pointer w-[full] justify-between p-5 bg-white shadow-xl hover:bg-[#009dc4]  border border-gray-200 rounded-lg ${
                  foodItem?.addOns?.includes(item.title) ? "!bg-[#009dc4]" : ""
                }`}
                onClick={() => openModalForSubMenu(item)}
              >
                <h3 className="font-medium text-lg">{item.title}</h3>
                <h3 className="font-medium text-lg">${item.price}</h3>
              </div>
            ))}
          </div>{" "}
          <div
            className={`flex justify-between items-center border-b border-gray-300 p-2 mt-4`}
          ></div>{" "}
          <p className="text-gray-800 my-6 text-lg font-semibold">
            Special Instructions
          </p>
          <textarea
            className="border border-gray-300 rounded-lg h-[10rem] w-full placeholder:text-gray-800 p-4"
            placeholder="No Substitutes.Addition may be charged extra"
            value={foodItem.specialNote}
            onChange={(e) =>
              setFoodItem((prev) => ({
                ...prev,
                specialNote: e.target.value,
              }))
            }
          />{" "}
          <div className="flex gap-5 w-full">
            <Link
              to=""
              className="w-[50%]"
              onClick={() => {
                closeModal();
                handleSubmit();
              }}
            >
              <button className="bg-[#009dc4] text-white w-full py-3 my-6 rounded-lg">
                Add More Items
              </button>
            </Link>
            <Link to="" className="w-[50%]" onClick={handleSubmit}>
              <button className="bg-[#009dc4] text-white w-full py-3 my-6 rounded-lg">
                Continue
              </button>
            </Link>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}
