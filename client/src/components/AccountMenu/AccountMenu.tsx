import { useRef, useState } from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import orderOperations from "../../redux/orders/orders-operations";

import OrderDetails from "../OrderDetails/OrderDetails";
import AccountMenuActions from "../AccountMenuActions/AccountMenuActions";

import UseOnClickOutside from "../../hooks/UseOnClickOutside/UseOnClickOutside";

import "../../styles/AccountMenu/AccountMenu.scss";

interface IAccountMenuProps {
  email: string | null;
  logoutHandler: () => void;
  closeMenu: () => void;
}

const AccountMenu = ({
  email,
  logoutHandler,
  closeMenu,
}: IAccountMenuProps) => {
  const [isOpenedOrderDetails, setIsOpenedOrderDetails] =
    useState<boolean>(false);

  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement>(null);

  UseOnClickOutside(menuRef, closeMenu);

  const orderDetailsToggle = () => {
    setIsOpenedOrderDetails(!isOpenedOrderDetails);
    dispatch(orderOperations.getUserOrders());
  };

  return (
    <div className="account-menu-wrapper" ref={menuRef}>
      {isOpenedOrderDetails ? (
        <OrderDetails />
      ) : (
        <AccountMenuActions
          email={email}
          logoutHandler={logoutHandler}
          orderDetailsToggle={orderDetailsToggle}
        />
      )}
    </div>
  );
};

export default AccountMenu;
