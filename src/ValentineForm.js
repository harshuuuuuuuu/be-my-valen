import React, { useState } from "react";

const ValentineForm = () => {
  const [formData, setFormData] = useState({
    dreamDate: "",
    romanticGesture: "",
    specialMoment: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://formspree.io/f/yourformid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setSubmitted(true);
    } else {
      alert("Something went wrong. Please try again!");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      {submitted ? (
        <p className="text-green-500 text-lg text-center">
          Thank you for your response! ❤️
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="block">
            What's your dream date? 🌟
            <input
              type="text"
              name="dreamDate"
              value={formData.dreamDate}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border rounded-md"
            />
          </label>

          <label className="block">
            Your favorite romantic gesture? 💕
            <input
              type="text"
              name="romanticGesture"
              value={formData.romanticGesture}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border rounded-md"
            />
          </label>

          <label className="block">
            What's a special moment we shared? ✨
            <input
              type="text"
              name="specialMoment"
              value={formData.specialMoment}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border rounded-md"
            />
          </label>

          <button
            type="submit"
            className="bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
          >
            Submit 💌
          </button>
        </form>
      )}
    </div>
  );
};

export default ValentineForm;
