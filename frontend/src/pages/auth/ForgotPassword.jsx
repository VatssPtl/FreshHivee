import { useState } from "react";

import { Link } from "react-router-dom";

import { api } from "../../services/api";

import logo from "../../assets/FreshHive_logo.svg";

import background from "../../assets/FreshHive_login_background.svg";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);


  const handleChange = (event) => {
    setEmail(event.target.value);

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await api("/auth/forgot-password", {
        method: "POST",

        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      setSuccess(
        response.message ||
          "If the email is registered, a password reset link has been sent."
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to send reset link. Please try again."
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


      {/* Forgot Password Card */}

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
            <h1
              className="
                text-[30px]
                font-semibold
                leading-tight
                tracking-tight
                text-[#16452f]
              "
            >
              Forgot Password?
            </h1>

            <p className="mt-1.5 text-[14px] text-[#718b72]">
              Enter your email to receive a password reset link
            </p>
          </div>


          {/* Message */}

          <div className="mt-3 h-[20px] text-center">
            {error && (
              <p className="text-[12px] font-medium leading-[20px] text-red-500">
                {error}
              </p>
            )}

            {success && (
              <p className="text-[14px] font-semibold leading-[20px] text-[#285943]">
                {success}
              </p>
            )}
          </div>


          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="mt-1 flex flex-1 flex-col"
          >

            {/* Email */}

            <div>
              <label
                htmlFor="email"
                className="
                  mb-1.5
                  block
                  text-[13px]
                  font-medium
                  text-[#24342a]
                "
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                disabled={loading}
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
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>


            {/* Send Reset Link Button */}

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
                ? "Sending..."
                : "Send Reset Link →"}
            </button>


            {/* Login Link */}

            <p className="mt-auto pt-3 text-center text-[13px] text-[#718b72]">
              Remember your password?{" "}

              <Link
                to="/login"
                className="
                  font-semibold
                  text-[#285943]
                  hover:underline
                "
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