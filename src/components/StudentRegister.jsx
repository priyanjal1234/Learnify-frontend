import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "./FormField";
import SubmitBtn from "./SubmitBtn";
import { BookOpen } from "lucide-react";
import Navbar from "./Navbar";
import { ThemeDataContext } from "../context/ThemeContext";
import { User, Mail, Lock } from "lucide-react";
import Terms from "./Terms";
import useFormHandler from "../hooks/useFormHandler";
import registerSchema from "../schemas/registerSchema";
import userService from "../services/User";
import { toast } from "react-toastify";

const StudentRegister = () => {
  const [loading, setloading] = useState(false);
  const { darkMode } = useContext(ThemeDataContext);
  let navigate = useNavigate();

  const { values, errors, handleChange } = useFormHandler(
    { name: "", email: "", password: "", role: "student" },
    registerSchema
  );

  async function handleRegisterSubmit(e) {
    e.preventDefault();

    setloading(true);
    const parsedData = registerSchema.safeParse(values);

    if (!parsedData.success) {
      setloading(false);
      const firstError = parsedData.error.issues[0]?.message;
      toast.error(firstError);
      return;
    }

    try {
      await userService.createAccount(values);
      toast.success("Check Your Email For Email Verification");
      setloading(false);
      navigate("/verify-email");
    } catch (error) {
      setloading(false);
      toast.error(error?.response?.data?.message || "Error Registering User");
    }
  }

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen`}
    >
      <Navbar />

      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-md w-full p-6">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div
                className={`p-3 rounded-full shadow-lg ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <BookOpen
                  className={`h-10 w-10 ${
                    darkMode ? "text-indigo-400" : "text-indigo-600"
                  }`}
                />
              </div>
            </div>
            <h2 className="text-4xl font-extrabold mb-2">Join Learnify</h2>
            <p className="text-lg text-gray-400">
              Start your learning journey today
            </p>
          </div>

          <div
            className={`py-8 px-10 shadow-2xl rounded-2xl ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              {/* Full Name Field */}
              <FormField
                label="Full Name"
                icon={User}
                type="text"
                placeholder="John Doe"
                name="name"
                value={values.name}
                handleChange={handleChange}
                error={errors.name}
              />

              {/* Email Field */}
              <FormField
                label="Email Address"
                icon={Mail}
                type="email"
                placeholder="you@example.com"
                name="email"
                value={values.email}
                handleChange={handleChange}
                error={errors.email}
              />

              {/* Password Field */}
              <FormField
                label="Password"
                icon={Lock}
                type="password"
                placeholder="••••••••"
                name="password"
                value={values.password}
                handleChange={handleChange}
                error={errors.password}
              />
              {/* Register Button */}
              <SubmitBtn loading={loading} btnText="Create Account" />
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div
                    className={`w-full border-t ${
                      darkMode ? "border-gray-600" : "border-gray-200"
                    }`}
                  ></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span
                    className={`px-2 ${
                      darkMode
                        ? "bg-gray-800 text-gray-400"
                        : "bg-white text-gray-500"
                    }`}
                  >
                    Already have an account?
                  </span>
                </div>
              </div>
              <Link
                to="/login"
                className={`mt-4 inline-block font-medium ${
                  darkMode
                    ? "text-indigo-400 hover:text-indigo-300"
                    : "text-indigo-600 hover:text-indigo-500"
                }`}
              >
                Sign in to your account
              </Link>
              <Link
                to="/register/instructor"
                className={`mt-4 inline-block font-medium ${
                  darkMode
                    ? "text-indigo-400 hover:text-indigo-300"
                    : "text-indigo-600 hover:text-indigo-500"
                }`}
              >
                Sign Up as Instructor
              </Link>
            </div>
          </div>
          <Terms />
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
