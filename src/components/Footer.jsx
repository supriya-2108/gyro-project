import { Facebook, Twitter, Instagram, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 py-16">
      <div className="container w-[80%] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Tasty Section */}
          <div>
            <h2 className="text-white text-2xl font-medium mb-4">Tasty</h2>
            <p className="mb-6">
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Opening Hours Section */}
          <div>
            <h2 className="text-white text-2xl font-medium mb-4">
              Opening Hours
            </h2>
            <div className="space-y-2">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <div key={day} className="flex gap-2">
                  <span>{day}:</span>
                  <span>11AM - 8PM</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information Section */}
          <div>
            <h2 className="text-white text-2xl font-medium mb-4">
              Contact Information
            </h2>
            <div className="space-y-2">
              <p>657 Gravois Rd, Fenton, MO 63026</p>
              <p>16366001333</p>
              <p>info@yoursite.com</p>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h2 className="text-white text-2xl font-medium mb-4">Newsletter</h2>
            <p className="mb-4">
              Far far away, behind the word mountains, far from the countries.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Subscribe"
                className="bg-transparent border-zinc-700 pr-10"
              />
              <button
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 text-zinc-400 hover:text-white"
              >
                <Send className="w-4 h-4" />
                <span className="sr-only">Subscribe to newsletter</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center text-sm border-t border-zinc-800 pt-8">
          <p>
            Copyright ©2024 All rights reserved | This template is made with ♥
            by{" "}
            <a
              href="#"
              className="text-zinc-300 hover:text-white transition-colors"
            >
              Colorlib
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
