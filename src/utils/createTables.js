import { createUserTable } from "../models/userTable.js";
import { createProductTable } from "../models/productTable.js";
import { createOrders } from "../models/orderTable.js";
import { createReviewTable } from "../models/reviewTable.js";
import { createOrderItemTable } from "../models/orderItemsTable.js";
import { createCartTable } from "../models/cartTable.js";
import { createShippingInfoTable } from "../models/shippingInfoTable.js";
import { createPaymentsTable } from "../models/paymentsTable.js";

export const createTables = async () => {
  try {
    await createUserTable();
    await createProductTable();
    await createOrders();
    await createReviewTable();
    await createOrderItemTable();
    await createCartTable();
    await createShippingInfoTable();
    await createPaymentsTable();
    console.log("All Tables created successfully !");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};
