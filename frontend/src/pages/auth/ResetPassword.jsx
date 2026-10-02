import { useState } from "react";

import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { api } from "../../services/api";

import logo from "../../assets/FreshHive_logo.svg";

import background from "../../assets/FreshHive_login_background.svg";


export default function ResetPassword() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!token) {
      setError("Invalid or missing reset link.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }


    try {
      setLoading(true);

      const response = await api("/auth/reset-password", {
        method: "POST",

        body: JSON.stringify({
          token: token,
          new_password: password,
        }),
      });


      setSuccess(
        response.message ||
          "Your password has been reset successfully."
      );


      setTimeout(() => {
        navigate("/login");
      }, 1800);

    } catch (err) {
      let message = "Unable to reset password. Please try again.";

      if (typeof err?.message === "string") {
        message = err.message;
      }

      setError(message);

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


      {/* Reset Password Card */}

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
              Reset Password
            </h1>

            <p className="mt-1.5 text-[14px] text-[#718b72]">
              Create a new password for your FreshHive account
            </p>

          </div>


          {/* Message */}

          <div className="mt-3 h-[20px] text-center">

            {error && (
              <p className="text-[13px] font-medium leading-[20px] text-red-500">
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


            {/* New Password */}

            <div>

              <label
                htmlFor="password"
                className="
                  mb-1.5
                  block
                  text-[13px]
                  font-medium
                  text-[#24342a]
                "
              >
                New Password
              </label>


              <div className="relative">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  placeholder="Enter your new password"
                  autoComplete="new-password"
                  disabled={loading}
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
                    disabled:cursor-not-allowed
                    disabled:opacity-60
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
                className="
                  mb-1.5
                  block
                  text-[13px]
                  font-medium
                  text-[#24342a]
                "
              >
                Confirm Password
              </label>


              <div className="relative">

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  placeholder="Confirm your new password"
                  autoComplete="new-password"
                  disabled={loading}
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
                    disabled:cursor-not-allowed
                    disabled:opacity-60
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


            {/* Reset Button */}

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
                ? "Resetting..."
                : "Reset Password →"}
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