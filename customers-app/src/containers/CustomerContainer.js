import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppFrame from '../componets/AppFrame';
import { getCustomerByDni } from '../selectors/customers';
import { Route,withRouter} from 'react-router-dom'; 
import CustomerEdit from './../componets/CustomerEdit';
import CustomerData from './../componets/CustomerData';
import fetchCustomers from './../actions/fetchCustomers';
import updateCustomer from './../actions/updateCustomer';
import deleteCustomer from './../actions/deleteCustomer';
import { SubmissionError } from 'redux-form';

class CustomerContainer extends Component { 
    componentDidMount(){
        if(!this.props.customer){
            this.props.fetchCustomers();
        }
    }
    handleSubmit = values=>{
        console.log(JSON.stringify(values));
        const {id}= values;
        return this.props.updateCustomer(id,values).then( r =>{
            if (r.error){
                throw new SubmissionError(r.payload);
            }
        });
    }
    handleOnBack = () =>{
        this.props.history.goBack();
    }
    handleOnSubmitSuccess = () =>{
        this.props.history.goBack();
    }
    handleOnDelete = id =>{ 
        this.props.deleteCustomer(id).then(v => {this.props.history.goBack()});
        
    }
    renderCustomerControl = (isEdit,isDelete) => {
        if (this.props.customer){
            const CustomerControl = isEdit ? CustomerEdit:CustomerData;
            return <CustomerControl 
            {...this.props.customer} 
            onSubmit={this.handleSubmit} 
            onSubmitSuccess={this.handleOnSubmitSuccess} 
            onBack={this.handleOnBack}
            isDeleteAllow= {!!isDelete}
            onDelete={this.handleOnDelete}/>
        }
    }
    renderBody =() =>(
        <Route path="/customers/:documento/edit" children={
            ({match: isEdit})=> (
                <Route path="/customers/:documento/del" children={
                ({match: isDelete}) => ( 
                    this.renderCustomerControl(isEdit,isDelete)
                )} />
            )
        } />
    )
    render() {
        return (
            <div>
                <AppFrame 
                header={`Cliente ${this.props.dni}`}
                body={
                    this.renderBody()
                }
                footer='Customer footer'
                ></AppFrame>
            </div>
        );
    }
}

CustomerContainer.propTypes = {
dni: PropTypes.string.isRequired,
customer: PropTypes.object,
fetchCustomers: PropTypes.func.isRequired,
updateCustomer: PropTypes.func.isRequired,
deleteCustomer: PropTypes.func.isRequired,
};

const mapStateToProps = (state,props) => ({
    customer: getCustomerByDni(state,props)
});

export default withRouter(connect(mapStateToProps,{
    fetchCustomers,
    updateCustomer,
    deleteCustomer
}) (CustomerContainer));