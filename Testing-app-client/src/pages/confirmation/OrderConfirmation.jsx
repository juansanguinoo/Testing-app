import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";

import { useOrderDetails } from "../../context/OrderDetails";

const OrderConfirmation = ({ setOrderPhase }) => {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      // in a real app we would get order details from context
      // and send with POST
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {
        // TODO: handle error from server
      });
  }, []);

  const handleClick = () => {
    // clear the order details
    resetOrder();

    // send back to order page
    setOrderPhase("inProgress");
  };

  if (orderNumber !== null) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank you!</h1>
        <p>Your order number is {orderNumber}</p>
        <p>as per our terms and conditions, nothing will happen now</p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default OrderConfirmation;
