import React, { useEffect, useRef } from "react";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";

const PhoneInput = ({ initialCountry = "in", onChange }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const inputElement = inputRef.current;
    console.log(inputElement.value);

    // Initialize intl-tel-input
    const iti = intlTelInput(inputElement, {
      initialCountry,
      separateDialCode: true,
    });

    // Debounced function to handle value changes
    const handleBlur = () => {
      const number = iti.getNumber();
      console.log(inputRef.current.value);

      onChange(inputRef.current.value); // Pass the full number to the parent
    };

    // Add event listeners
    inputElement.addEventListener("blur", handleBlur);

    return () => {
      // Cleanup event listener and destroy intl-tel-input instance
      inputElement.removeEventListener("blur", handleBlur);
      iti.destroy();
    };
  }, [initialCountry, onChange]);

  return (
    <div>
      <input
        type="tel"
        ref={inputRef}
        className="form-control border border-gray-300 rounded-md p-2"
        placeholder="Enter your mobile number"
      />
    </div>
  );
};

export default PhoneInput;
