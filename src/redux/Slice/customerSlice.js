import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cEmail: null,
  cContact: null,
  cName: null,
  cPlate: null,
  cCar: null,
  cId: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    SET_CUSTOMER_DATA: (state, action) => {
      const { cEmail, cContact, cName, cCar, cPlate, cId } = action.payload;
      state.cEmail = cEmail;
      state.cContact = cContact;
      state.cName = cName;
      state.cCar = cCar;
      state.cPlate = cPlate;
      state.cId = cId;
    },
    REMOVE_CUSTOMER_DATA(state, action) {
      state.cEmail = null;
      state.cContact = null;
      state.cName = null;
      state.cCar = null;
      state.cPlate = null;
      state.cId = null;
    },
  },
});

export const { SET_CUSTOMER_DATA, REMOVE_CUSTOMER_DATA } =
  customerSlice.actions;

export const selectCustomerEmail = (state) => state.customer.cEmail;
export const selectCustomerContact = (state) => state.customer.cContact;
export const selectCustomerName = (state) => state.customer.cName;
export const selectCustomerCar = (state) => state.customer.cCar;
export const selectCustomerPlate = (state) => state.customer.cPlate;
export const selectCustomerId = (state) => state.customer.cId;

export default customerSlice.reducer;
