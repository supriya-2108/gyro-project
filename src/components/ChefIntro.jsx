import { Clock, Phone } from "lucide-react";
import "aos/dist/aos.css";
import AOS from "aos";
import StatsIntro from "../components/StatsIntro";
import { useEffect } from "react";
export default function ChefIntro() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div data-aos="fade-up">
      <section
        className="container w-[90%] mt-10 mx-auto bg-[#ccc] justify-center px-4 py-12 pl-[10%] mb-12"
        style={{
          backgroundImage: "url()",
          backgroundSize: "cover", // Adjust to "contain" if needed
          backgroundPosition: "center", // Adjust position as needed
          backgroundRepeat: "no-repeat", // Avoid repeating the image
        }}
      >
        <div className="grid gap-[3rem] lg:grid-cols-2 justify-center mx-auto">
          <div className="grid grid-cols-2 gap-10">
            <div className="overflow-hidden rounded-lg h-full">
              <img
                alt="Chef preparing a dish"
                className=" h-[30rem] w-[45rem] object-cover"
                src="/about.png"
              />
            </div>
            <div className=" overflow-hidden rounded-lg mt-10 -ml-5">
              <img
                alt="Cooking preparation with fresh ingredients"
                className=" h-[30rem] w-[45rem] object-cover"
                src="/about1.png"
              />
            </div>
          </div>
          <div className="flex flex-col w-[80%] mt-10 space-y-6">
            <div className="">
              <h1 className=" text-[#009dc4] font-greatVibes text-8xl mt-2">
                About
              </h1>
              <p className="font-bold text-[#3d3b3a] text-4xl -mt-10">
                Gyro Restaurant
              </p>
            </div>
            <p className="text-[#3d3b3a] leading-relaxed text-lg font-normal tracking-wide">
              Gyro Gyro llc. A family owned and operated greek cuisine
              restaurant Has served the fenton region for over 10+ years nestled
              in the heart of Gravois bluffs
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 text-gray-600">
                {/* <Clock className="h-5 w-5 text-[#009dc4]" /> */}
                <span>Mon - Sat</span>
                <span className="font-semibold">11 AM - 8 PM</span>
              </div>
              <div className="flex items-center gap-2">
                {/* <Phone className="h-5 w-5 text-[#009dc4]" /> */}
                <a
                  href="tel:16366001333"
                  className="text-4xl font-bold text-[#3d3b3a] transition-colors"
                >
                  16366001333
                </a>
              </div>
            </div>
          </div>
        </div>
        <StatsIntro />
      </section>
    </div>
  );
}
