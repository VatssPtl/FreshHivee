import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />


        {/* Temporary Home */}

        <Route
          path="/"
          element={
            <div className="flex min-h-screen items-center justify-center bg-[#f5f2e8]">
              <div className="rounded-3xl bg-[#fbf9f2] px-10 py-8 text-center shadow-lg">
                <h1 className="text-3xl font-semibold text-[#285943]">
                  FreshHive
                </h1>

                <p className="mt-2 text-[#718b72]">
                  Welcome to FreshHive.
                </p>
              </div>
            </div>
          }
        />


        {/* Unknown routes */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}


export default App;