import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {  withRouter} from 'react-router-dom'; 
import AppFrame from '../componets/AppFrame';
import CustomerEdit from './../componets/CustomerEdit';
import insertCustomer from './../actions/insertCustomer';
import { SubmissionError } from 'redux-form';

class NewCustomerContainer extends Component {
    handleSubmit = values=>{
        return this.props.insertCustomer(values).then( r =>{
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
    renderBody =() =>{
        return <CustomerEdit onSubmit={this.handleSubmit} onSubmitSuccess={this.handleOnSubmitSuccess} onBack={this.handleOnBack} />
    }
    render() {
        return (
            <div>
                <AppFrame 
                header={`Creacion de un nuevo cliente `} 
                body={
                    this.renderBody()
                }
                footer='New Customer footer'
                ></AppFrame>
            </div>
        );
    }
}

NewCustomerContainer.propTypes = {
    insertCustomer: PropTypes.func.isRequired,
};

export default withRouter(connect(null,{insertCustomer}) (NewCustomerContainer)); 