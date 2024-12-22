import { Cake, Users, UtensilsCrossed } from "lucide-react";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
export default function Detail() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="w-full mx-auto px-4 py-16 bg-gray-200">
      <div className="text-center mb-16">
        <h2 className="relative inline-block">
          <span className="text-[#009dc4] font-serif italic text-4xl absolute -top-8 left-1/2 -translate-x-1/2">
            Services
          </span>
          <span className="text-4xl font-bold text-[#3d3b3a]">
            Catering Services
          </span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="space-y-4" data-aos="fade-up">
          <div className="w-20 h-20 mx-auto bg-[#C4A484]/10 rounded-full flex items-center justify-center">
            <Cake className="w-10 h-10 text-[#009dc4]" />
          </div>
          <h3 className="text-2xl font-bold text-[#3d3b3a]">Birthday Party</h3>
          <p className="text-zinc-600 max-w-sm mx-auto">
            Even the all-powerful Pointing has no control about the blind texts
            it is an almost unorthographic.
          </p>
        </div>

        <div className="space-y-4" data-aos="fade-up">
          <div className="w-20 h-20 mx-auto bg-[#C4A484]/10 rounded-full flex items-center justify-center">
            <Users className="w-10 h-10 text-[#009dc4]" />
          </div>
          <h3 className="text-2xl font-bold text-[#3d3b3a]">
            Business Meetings
          </h3>
          <p className="text-zinc-600 max-w-sm mx-auto">
            Even the all-powerful Pointing has no control about the blind texts
            it is an almost unorthographic.
          </p>
        </div>

        <div className="space-y-4" data-aos="fade-up">
          <div className="w-20 h-20 mx-auto bg-[#C4A484]/10 rounded-full flex items-center justify-center">
            <UtensilsCrossed className="w-10 h-10 text-[#009dc4]" />
          </div>
          <h3 className="text-2xl font-bold text-[#3d3b3a]">Wedding Party</h3>
          <p className="text-zinc-600 max-w-sm mx-auto">
            Even the all-powerful Pointing has no control about the blind texts
            it is an almost unorthographic.
          </p>
        </div>
      </div>
    </div>
  );
}
