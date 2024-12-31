import React from "react";

function Map() {
  return (
    <div className="map-container py-10 bg-gray-300">
      <h2 className="text-center text-3xl font-semibold mb-4">Our Location</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3121.916840162406!2d-90.44616042427037!3d38.51262877180871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d8cfdbaef2e18d%3A0x37ae67c13544fb07!2s657%20Gravois%20Rd%2C%20Fenton%2C%20MO%2063026%2C%20USA!5e0!3m2!1sen!2sin!4v1735638642009!5m2!1sen!2sin"
        width="100%"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

export default Map;
