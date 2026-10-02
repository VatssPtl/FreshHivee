import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import backgroundImage from "../../assets/FreshHive_login_background.svg";
import logo from "../../assets/FreshHive_logo.svg";
import { api } from "../../services/api";

function MailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function EyeIcon({ hidden }) {
  return hidden ? (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 3 18 18" />
      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
      <path d="M9.9 4.2A10.7 10.7 0 0 1 12 4c5 0 8.5 4 9.5 6a11.8 11.8 0 0 1-3.2 3.8" />
      <path d="M6.6 6.6C4.4 8 2.9 10 2.5 10.5 3.5 12.5 7 16 12 16c1.1 0 2.2-.2 3.1-.5" />
    </svg>
  ) : (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.5a4.7 4.7 0 0 1-2 3.1v2.6h3.2c1.9-1.8 3.1-4.4 3.1-7.5Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 5-.9 6.7-2.4l-3.2-2.6c-.9.6-2 1-3.5 1-2.7 0-5-1.8-5.8-4.3H2.9v2.7A10.1 10.1 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.2 13.7a6 6 0 0 1 0-3.4V7.6H2.9a10 10 0 0 0 0 8.8l3.3-2.7Z"
      />
      <path
        fill="#EA4335"
        d="M12 6c1.5 0 2.8.5 3.8 1.5l2.8-2.8C17 3.1 14.7 2 12 2a10.1 10.1 0 0 0-9.1 5.6l3.3 2.7C7 7.8 9.3 6 12 6Z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M16.7 12.8c0-2.1 1.7-3.2 1.8-3.3-1-.1-2.2-1.1-3.7-1.1-1.4 0-2.5.8-3.2.8-.7 0-1.7-.8-2.9-.8-1.5 0-2.8.9-3.6 2.2-1.6 2.7-.4 6.7 1.1 8.9.8 1.1 1.7 2.3 2.9 2.2 1.2-.1 1.6-.7 3-.7 1.4 0 1.8.7 3 .7 1.3 0 2.1-1.1 2.8-2.2.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.5-1-2.5-4Zm-2.4-6c.6-.7 1-1.7.9-2.8-.9 0-2 .6-2.6 1.3-.6.6-1 1.6-.9 2.6 1 .1 2-.5 2.6-1.1Z" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24">
      <rect x="2" y="2" width="9" height="9" fill="#F35325" />
      <rect x="13" y="2" width="9" height="9" fill="#81BC06" />
      <rect x="2" y="13" width="9" height="9" fill="#05A6F0" />
      <rect x="13" y="13" width="9" height="9" fill="#FFBA08" />
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({
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
        err.message || "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="
        min-h-screen
        w-full
        overflow-hidden
        bg-cover
        bg-center
        bg-no-repeat
      "
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="relative mx-auto min-h-screen w-full max-w-[1568px]">

        {/* LOGIN CARD */}
        <section
          className="
            absolute
            left-[20%]
            top-1/2
            z-20
            w-[580px]
            h-[635px]
            -translate-y-1/2
            rounded-[28px]
            bg-[#f5f2e8]
            px-14
            py-10
            shadow-[0_15px_45px_rgba(30,64,49,0.10)]
          "
        >
          {/* Logo */}
          <div className="mb-5 flex justify-center">
            <img
              src={logo}
              alt="FreshHive"
              className="w-[205px]"
            />
          </div>

          {/* Heading */}
          <div className="mb-6 text-center">
            <h1 className="text-[32px] font-semibold tracking-tight text-fresh-dark">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-fresh-secondary">
              Login to continue your FreshHive journey
            </p>
          </div>

          {/* Error */}
  {error && (
  <p className="mb-3 text-center text-sm font-medium text-red-600">
    {error}
  </p>
)}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Email */}
            <div
              className="
                flex
                h-[56px]
                items-center
                gap-3
                rounded-full
                border
                border-fresh-border
                bg-[#fbf9f2]
                px-5
                focus-within:border-fresh-primary
              "
            >
              <span className="text-fresh-primary">
                <MailIcon />
              </span>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email or Phone"
                autoComplete="email"
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  text-[15px]
                  text-fresh-text
                  outline-none
                  placeholder:text-gray-400
                "
              />
            </div>

            {/* Password */}
            <div
              className="
                flex
                h-[56px]
                items-center
                gap-3
                rounded-full
                border
                border-fresh-border
                bg-[#fbf9f2]
                px-5
                focus-within:border-fresh-primary
              "
            >
              <span className="text-fresh-primary">
                <LockIcon />
              </span>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                autoComplete="current-password"
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  text-[15px]
                  text-fresh-text
                  outline-none
                  placeholder:text-gray-400
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                className="text-gray-500 hover:text-fresh-primary"
              >
                <EyeIcon hidden={showPassword} />
              </button>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end px-2">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-fresh-primary hover:text-fresh-accent"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="
                flex
                h-[56px]
                w-full
                items-center
                justify-center
                gap-3
                rounded-full
                bg-fresh-primary
                text-[16px]
                font-medium
                text-white
                shadow-[0_10px_25px_rgba(40,89,67,0.18)]
                transition
                hover:bg-fresh-dark
                active:scale-[0.99]
                disabled:opacity-70
              "
            >
              {loading ? "Logging in..." : "Log In"}

              {!loading && <ArrowIcon />}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-fresh-border" />

            <span className="text-xs text-gray-400">
              OR
            </span>

            <div className="h-px flex-1 bg-fresh-border" />
          </div>

          {/* Social Login */}
          <div className="flex justify-center gap-5">
            <button
              type="button"
              className="
                flex h-[56px] w-[56px]
                items-center justify-center
                rounded-full
                border border-fresh-border
                bg-[#fbf9f2]
                transition
                hover:bg-white
              "
            >
              <GoogleIcon />
            </button>

            <button
              type="button"
              className="
                flex h-[56px] w-[56px]
                items-center justify-center
                rounded-full
                border border-fresh-border
                bg-[#fbf9f2]
                text-gray-800
                transition
                hover:bg-white
              "
            >
              <AppleIcon />
            </button>

            <button
              type="button"
              className="
                flex h-[56px] w-[56px]
                items-center justify-center
                rounded-full
                border border-fresh-border
                bg-[#fbf9f2]
                transition
                hover:bg-white
              "
            >
              <MicrosoftIcon />
            </button>
          </div>

          {/* Sign Up */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-fresh-primary hover:text-fresh-accent"
            >
              Sign Up
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}