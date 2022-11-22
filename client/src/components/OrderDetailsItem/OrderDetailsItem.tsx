import { ReactNode } from "react";

interface IOrderDetailsItemProps {
  children: ReactNode | ReactNode[];
}

const OrderDetailsItem = ({ children }: IOrderDetailsItemProps) => {
  return <div className="order-details__item">{children}</div>;
};

export default OrderDetailsItem;
