import { useEffect, useCallback, useState, lazy } from "react";

import { useAppDispatch } from "./redux/hooks/hooks";
import { Routes, Route } from "react-router-dom";
import authOperations from "./redux/users/users-operations";

import Layout from "./components/Layout/Layout";
import OrderPage from "./components/_pages/OrderPage/OrderPage";
import NeedToAuthPage from "./components/_pages/NeedToAuthPage/NeedToAuthPage";
import PrivateRoute from "./hok/PrivateRoute/PrivateRoute";
import PublicRoute from "./hok/PublicRoute/PublicRoute";

import ThemeContext from "./context/context";

const MainPage = lazy(() => import("./components/_pages/MainPage/MainPage"));
const AuthPage = lazy(() => import("./components/_pages/AuthPage/AuthPage"));
const NotFoundPage = lazy(
  () => import("./components/_pages/NotFoundPage/NotFoundPage")
);

const App = () => {
  const dispatch = useAppDispatch();
  const [theme, setTheme] = useState<string | null>(null);

  const fetchCurrentUser = useCallback(() => {
    dispatch(authOperations.getCurrent());
  }, [dispatch]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return (
    <ThemeContext.Provider value={theme}>
      <Routes>
        <Route path="/" element={<Layout setTheme={setTheme} />}>
          <Route index element={<MainPage />} />
          <Route path="/" element={<MainPage />}>
            <Route
              path="booking"
              element={
                <PrivateRoute>
                  <OrderPage />
                </PrivateRoute>
              }
            />

            <Route
              path="booking/needAuthorization"
              element={
                <PublicRoute restricted>
                  <NeedToAuthPage />
                </PublicRoute>
              }
            />
          </Route>
        </Route>

        <Route
          path="signup"
          element={
            <PublicRoute restricted>
              <AuthPage />
            </PublicRoute>
          }
        />

        <Route
          path="signin"
          element={
            <PublicRoute restricted>
              <AuthPage />
            </PublicRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeContext.Provider>
  );
};

export default App;
