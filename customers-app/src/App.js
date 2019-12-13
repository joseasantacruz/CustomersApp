import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import './App.css';
import HomeContainer from './containers/HomeContainer';
import CustomersContainer from './containers/CustomersContainer';
import CustomerContainer from './containers/CustomerContainer';
import NewCustomerContainer from './containers/NewCustomerContainer';

class App extends Component{
  renderHome =() => <HomeContainer></HomeContainer>;
  renderCustomerContainer = () => <h1>Customer Container</h1>;
  renderCustomerListContainer = () => <h1>Customer List Container</h1>;
  renderCustomerNewContainer = () => <h1>Customer New Container</h1>;

  render(){
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={this.renderHome} />
          <Route exact path="/customers" component={CustomersContainer} />
          <Switch>
            <Route path="/customers/new" component={NewCustomerContainer} /> 
            <Route path="/customers/:documento" render={props => <CustomerContainer dni={props.match.params.documento}></CustomerContainer>} />
          </Switch>
        </div>
      </Router>
    );

  }
  
}

export default App;
