import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { api } from "../../services/api";

import logo from "../../assets/FreshHive_logo.svg";
import background from "../../assets/FreshHive_login_background.svg";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      localStorage.setItem(
        "freshhive_token",
        response.access_token
      );

      localStorage.setItem(
        "freshhive_user",
        JSON.stringify(response.user)
      );

      navigate("/");
    } catch (err) {
      setError(
        err.message ||
          "Unable to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-[#f5f2e8]
      "
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Soft background overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Register Card */}
      <section
        className="
          absolute
          left-[22.5%]
          top-1/2
          z-20
          h-[635px]
          w-[560px]
          -translate-y-1/2
          rounded-[28px]
          bg-[#f5f2e8]
          px-14
          py-7
          shadow-[0_15px_45px_rgba(30,64,49,0.12)]
        "
      >
        {/* Content wrapper */}
        <div className="flex h-full flex-col">
          
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src={logo}
              alt="FreshHive"
              className="h-auto w-[165px]"
            />
          </div>

          {/* Heading */}
          <div className="mt-3 text-center">
            <h1 className="text-[30px] font-semibold leading-tight tracking-tight text-[#16452f]">
              Create Account
            </h1>

            <p className="mt-1.5 text-[14px] text-[#718b72]">
              Join FreshHive and start shopping fresh
            </p>
          </div>

          {/* Error message */}
          <div className="mt-3 h-[20px] text-center">
            {error && (
              <p className="text-[12px] font-medium leading-[20px] text-red-500">
                {error}
              </p>
            )}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-1 flex flex-1 flex-col"
          >
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-[13px] font-medium text-[#24342a]"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                className="
                  h-[48px]
                  w-full
                  rounded-full
                  border
                  border-[#d8ccb4]
                  bg-[#fbf9f2]
                  px-5
                  text-[14px]
                  text-[#24342a]
                  outline-none
                  transition
                  placeholder:text-[#9aa497]
                  focus:border-[#285943]
                  focus:ring-2
                  focus:ring-[#285943]/10
                "
              />
            </div>

            {/* Email */}
            <div className="mt-3">
              <label
                htmlFor="email"
                className="mb-1.5 block text-[13px] font-medium text-[#24342a]"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                className="
                  h-[48px]
                  w-full
                  rounded-full
                  border
                  border-[#d8ccb4]
                  bg-[#fbf9f2]
                  px-5
                  text-[14px]
                  text-[#24342a]
                  outline-none
                  transition
                  placeholder:text-[#9aa497]
                  focus:border-[#285943]
                  focus:ring-2
                  focus:ring-[#285943]/10
                "
              />
            </div>

            {/* Password */}
            <div className="mt-3">
              <label
                htmlFor="password"
                className="mb-1.5 block text-[13px] font-medium text-[#24342a]"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  className="
                    h-[48px]
                    w-full
                    rounded-full
                    border
                    border-[#d8ccb4]
                    bg-[#fbf9f2]
                    px-5
                    pr-12
                    text-[14px]
                    text-[#24342a]
                    outline-none
                    transition
                    placeholder:text-[#9aa497]
                    focus:border-[#285943]
                    focus:ring-2
                    focus:ring-[#285943]/10
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((value) => !value)
                  }
                  className="
                    absolute
                    right-5
                    top-1/2
                    -translate-y-1/2
                    text-[16px]
                    text-[#285943]
                  "
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "◉" : "◌"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mt-3">
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-[13px] font-medium text-[#24342a]"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  className="
                    h-[48px]
                    w-full
                    rounded-full
                    border
                    border-[#d8ccb4]
                    bg-[#fbf9f2]
                    px-5
                    pr-12
                    text-[14px]
                    text-[#24342a]
                    outline-none
                    transition
                    placeholder:text-[#9aa497]
                    focus:border-[#285943]
                    focus:ring-2
                    focus:ring-[#285943]/10
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (value) => !value
                    )
                  }
                  className="
                    absolute
                    right-5
                    top-1/2
                    -translate-y-1/2
                    text-[16px]
                    text-[#285943]
                  "
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? "◉" : "◌"}
                </button>
              </div>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                mt-4
                flex
                h-[52px]
                w-full
                items-center
                justify-center
                rounded-full
                bg-[#285943]
                text-[14px]
                font-medium
                text-white
                shadow-[0_10px_25px_rgba(40,89,67,0.20)]
                transition
                hover:bg-[#1e4031]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading
                ? "Creating Account..."
                : "Create Account →"}
            </button>

            {/* Login Link */}
            <p className="mt-auto pt-3 text-center text-[13px] text-[#718b72]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#285943] hover:underline"
              >
                Log In
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}