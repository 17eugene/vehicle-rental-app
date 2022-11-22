import { useEffect, useCallback, lazy } from "react";

import { useAppDispatch } from "./redux/hooks/hooks";
import { Routes, Route } from "react-router-dom";
import authOperations from "./redux/users/users-operations";

import Layout from "./components/Layout/Layout";
import OrderPage from "./components/_pages/OrderPage/OrderPage";
import NeedToAuthPage from "./components/_pages/NeedToAuthPage/NeedToAuthPage";
import PrivateRoute from "./hok/PrivateRoute/PrivateRoute";
import PublicRoute from "./hok/PublicRoute/PublicRoute";

const MainPage = lazy(() => import("./components/_pages/MainPage/MainPage"));
const AuthPage = lazy(() => import("./components/_pages/AuthPage/AuthPage"));
const NotFoundPage = lazy(
  () => import("./components/_pages/NotFoundPage/NotFoundPage")
);

const App = () => {
  const dispatch = useAppDispatch();

  const fetchCurrentUser = useCallback(() => {
    dispatch(authOperations.getCurrent());
  }, [dispatch]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return (
      <Routes>
        <Route path="/" element={<Layout />}>
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
  );
};

export default App;
