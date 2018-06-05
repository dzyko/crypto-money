import React, {Component} from 'react';
import './Cryptos.css';

import CurrencyList from './CurrencyList';
import CurrencyDetails from './CurrencyDetails';
import CurrencyChart from './CurrencyChart';


// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';

// import Avatar from '@material-ui/core/Avatar';
import {inject, observer} from 'mobx-react';





class Cryptos extends Component
{
    componentDidMount(){
        // this.props.cryptoDetailsStore.loadCryptos();
    };


    render() {
        return (
            <div className="container">
                <div className="currencylist">
                    <CurrencyList />
                </div>
                <div className="currencydetails">
                    <CurrencyDetails />
                </div>
                <div className="currencychart">
                    <CurrencyChart />
                </div>
            </div>
        );
    }
}

// export default inject("cryptoDetailsStore")(observer(CryptoDetails));
export default Cryptos;
