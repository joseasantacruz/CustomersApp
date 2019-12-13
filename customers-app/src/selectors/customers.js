import {createSelector} from 'reselect';
const getCustomers = state => state.customers;


export default getCustomers;
export const getCustomerByDni = createSelector((state, props) => state.customers.find(c =>c.dni===props.dni),
customer => customer );