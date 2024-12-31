import { motion } from "framer-motion";
import { ShoppingBag, UtensilsCrossed, Car } from "lucide-react";
import { Link } from "react-router-dom";

const orderingOptions = [
  {
    title: "Pickup",
    icon: ShoppingBag,
    description: "Order ahead and pick up at your convenience",
    href: "http://localhost:3001/orderOnline",
    color: "from-cyan-500 to-teal-500",
  },
  {
    title: "Dine-in",
    icon: UtensilsCrossed,
    description: "Join us for an authentic Mediterranean experience",
    href: "http://localhost:3001/orderOnline",
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
    <div className="w-full absolute !top-[18rem] px-4 py-16 sm:px-6 lg:px-8 ">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  <option.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  {option.title}
                </h3>
                <p className="mt-2 text-gray-100 text-sm">
                  {option.description}
                </p>
                {/* <div className="mt-4 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    Order Now
                  </span>
                  <svg
                    className="ml-2 h-4 w-4 text-white transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div> */}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
