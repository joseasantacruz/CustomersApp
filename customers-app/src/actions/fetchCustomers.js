import {FETCH_CUSTOMERS} from './../constants';
import { createAction } from 'redux-actions';
import {apiGet} from './../api';
import { urlCustomers } from '../api/urls';



 const fetchCustomers = createAction(FETCH_CUSTOMERS,apiGet(urlCustomers));

 export default fetchCustomers;
