import { useContext } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import { useTranslation } from "react-i18next";
import CarsElement from "../CarsElement/CarsElement";
import OrderDetailsItem from "../OrderDetailsItem/OrderDetailsItem";
import Loader from "../Loader/Loader";

import ThemeContext from "../../context/context";

import "../../styles/OrderDetails/OrderDetails.scss";

const OrderDetails = () => {
  const theme = useContext(ThemeContext);
  const ordersCollection = useAppSelector(
    (state) => state.orders.ordersCollection
  );
  const ordersLoading = useAppSelector((state) => state.orders.loading);
  const { t } = useTranslation();

  return (
    <div className={theme === "light" ? "order-details" : "order-details dark"}>
      {ordersLoading ? (
        <Loader />
      ) : (
        <>
          {ordersCollection.length > 0 ? (
            ordersCollection.map((order) => (
              <OrderDetailsItem key={order._id}>
                <CarsElement
                  carId={order.orderedCar.car}
                  dateStart={order.dateStart}
                  dateEnd={order.dateEnd}
                  totalPrice={order.orderedCar.totalPrice}
                />
              </OrderDetailsItem>
            ))
          ) : (
            <p className="order-details__empty">{t("order.empty")}</p>
          )}
        </>
      )}
    </div>
  );
};

export default OrderDetails;
