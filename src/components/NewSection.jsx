"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const images = [
  "/placeholder.svg?height=1080&width=1920&text=Restaurant+Image+1",
  "/placeholder.svg?height=1080&width=1920&text=Restaurant+Image+2",
  "/placeholder.svg?height=1080&width=1920&text=Restaurant+Image+3",
];

export default function RestaurantPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }, []);

  useEffect(() => {
    const intervalId = setInterval(nextImage, 5000); // Change image every 5 seconds
    return () => clearInterval(intervalId);
  }, [nextImage]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <header className="absolute top-0 left-0 right-0 z-10">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-white text-2xl font-semibold border border-white px-4 py-1"
            >
              Tasty
            </Link>
            <ul className="hidden md:flex space-x-6">
              {[
                "Home",
                "Menu",
                "Specialties",
                "Reservation",
                "Blog",
                "About",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <div className="relative h-screen">
          {images.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Restaurant interior ${index + 1}`}
              layout="fill"
              objectFit="cover"
              priority={index === 0}
              className={`transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-handwriting mb-8 max-w-4xl">
              Book a table for yourself at a time convenient for you
            </h1>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black"
            >
              Book a table
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
            onClick={prevImage}
          >
            <ChevronLeft className="h-8 w-8" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
            onClick={nextImage}
          >
            <ChevronRight className="h-8 w-8" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      </main>

      <footer className="bg-orange-400 py-8">
        <div className="container mx-auto px-4">
          <form className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              type="text"
              placeholder="Name"
              className="bg-transparent border-black placeholder-black"
            />
            <Input
              type="tel"
              placeholder="Phone"
              className="bg-transparent border-black placeholder-black"
            />
            <Input
              type="text"
              placeholder="M/D/YYYY"
              className="bg-transparent border-black placeholder-black"
            />
            <Input
              type="text"
              placeholder="Time"
              className="bg-transparent border-black placeholder-black"
            />
            <div className="grid grid-cols-2 gap-4">
              <Select>
                <SelectTrigger className="bg-transparent border-black text-black">
                  <SelectValue placeholder="Person" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Person" : "People"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="bg-white text-black hover:bg-gray-100">
                Book a table
              </Button>
            </div>
          </form>
        </div>
      </footer>
    </div>
  );
}
