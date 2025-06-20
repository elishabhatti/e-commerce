import React, { useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    address: "",
    phone: "",
  });
  const { storeTokenIns } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        JSON.stringify(formData),
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      storeTokenIns(response.data.token);
      navigate("/");
      setFormData({
        username: "",
        email: "",
        password: "",
        avatar: "",
        address: "",
        phone: "",
      });

      toast.success("User Registered!");
    } catch (error) {
      toast.error(error.message);
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-10">
      <div className="flex flex-col md:flex-row w-full max-w-6xl  rounded-lg overflow-hidden">
        {/* Left form side */}
        <div className="w-full md:w-1/2 px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <h2 className="text-2xl font-bold mb-4">REGISTER USER</h2>
            <Input
              label="Full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              hint="The password must be between 4 and 6 characters"
            />
            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <Input
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              label="Avatar"
              name="avatar"
              type="url"
              value={formData.avatar}
              onChange={handleChange}
            />

            <div className="flex items-start text-sm">
              <input
                type="checkbox"
                required
                className="mt-1 mr-2 accent-purple-600"
              />
              <p className="text-gray-600">
                I have accepted the{" "}
                <a href="#" className="text-purple-600 underline">
                  Terms and Conditions
                </a>
              </p>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-[#110C30] text-white py-2 my-2 rounded-md hover:bg-[#1a1342] transition"
            >
              SIGN UP NOW
            </button>
          </form>
        </div>

        {/* Right image side */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://img.freepik.com/premium-vector/account-login-line-icon-new-user-register-registration-concept-illustration_1948-2099.jpg"
            alt="Sign up illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
