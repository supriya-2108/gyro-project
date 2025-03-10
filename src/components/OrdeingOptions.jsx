import { motion } from "framer-motion";
import { ShoppingBag, UtensilsCrossed, Car } from "lucide-react";
import { Link } from "react-router-dom";

const orderingOptions = [
  {
    title: "Carryout",
    icon: ShoppingBag,
    description: "Order ahead and pick up at your convenience",
    href: "/menu",
    color: "from-cyan-500 to-teal-500",
  },
  {
    title: "Dine-in",
    icon: UtensilsCrossed,
    description: "Join us for an authentic Mediterranean experience",
    href: "/menu",
    color: "from-cyan-400 to-blue-500",
  },
  {
    title: "UberEats",
    icon: Car,
    description: "Get your favorites delivered to your door",
    href: "https://www.ubereats.com/store/gyro-gyro/qCCcsGJLXnmODbWkckPY2w?diningMode=DELIVERY",
    color: "from-cyan-500 to-blue-600",
  },
];

export function OrderingOptions() {
  return (
    <div className=" w-full absolute !top-[4rem] md:!top-[18rem] px-4 py-16 sm:px-6 lg:px-8 ">
      <div className="mx-auto w-[100%] md:max-w-4xl">
        <div className="grid !gap-5 md:!gap-8 grid-cols-3 lg:grid-cols-3">
          {orderingOptions.map((option) => (
            <motion.div
              key={option.title}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <Link
                to={option.href}
                className={`flex flex-col items-center rounded-2xl p-4 text-center shadow-lg 
                  ${option.color} hover:shadow-xl transition-all duration-300`}
                onClick={() => localStorage.setItem("mode", option.title)}
              >
                <div className="flex h-10 w-10 md:h-16 md:w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  <option.icon className=" md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="md:mt-6 text-sm md:text-xl font-semibold text-white">
                  {option.title}
                </h3>
                <p className="md:mt-2 text-gray-100 text-[0.5rem] md:text-sm max-sm:hidden">
                  {option.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
