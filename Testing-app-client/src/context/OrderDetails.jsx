import { createContext, useContext, useState } from "react";

import { pricePerItem } from "../constants";

const OrderDetails = createContext();

export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be called from within an OrderDetailsProvider"
    );
  }

  return contextValue;
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {},
    toppings: {},
  });

  function updateItemCount(itemName, newItemCount, optionType) {
    // Make a copy of existing state
    const newOptionCounts = { ...optionCounts };

    // Update the copy with the new information
    newOptionCounts[optionType][itemName] = newItemCount;

    // Update the state with the updated copy
    setOptionCounts(newOptionCounts);
  }

  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} });
  }

  function calculateTotal(optionType) {
    // Get an array of counts for the option type
    const countsArray = Object.values(optionCounts[optionType]);

    // Total the values in the array of counts for the number of item
    const totalCount = countsArray.reduce((total, value) => total + value, 0);

    // Multiply the total of number of items by the price for this item type
    return totalCount * pricePerItem[optionType];
  }

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = { optionCounts, totals, updateItemCount, resetOrder };

  return <OrderDetails.Provider value={value} {...props} />;
}
