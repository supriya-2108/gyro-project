"use client";

import { useState } from "react";
import { X } from "lucide-react";

const CustomModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl mx-4 w-[40rem] h-[40rem] overflow-y-scroll">
        <div className="p-4 relative">{children}</div>
      </div>
    </div>
  );
};
export default CustomModal;
