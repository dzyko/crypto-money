import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import './CurrencyList.css';

import "react-custom-scroll/dist/customScroll.css";
import CustomScroll from 'react-custom-scroll';

import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

import SvgIcon from '@material-ui/core/SvgIcon';

class CurrencyList extends Component {
    componentDidMount(){
        this.props.cryptoDetailsStore.loadCryptos();
        // console.log(this.props.cryptoDetailsStore.getCryptoList);
        
        // this.props.cryptoDetailsStore.setSelectedCurrency(this.props.cryptoDetailsStore.getCryptoList[0])
    };

    handleClick = (e, selectedCurrency) => {
        // console.log(selectedCurrency);
        this.props.cryptoDetailsStore.setSelectedCurrency(selectedCurrency);
        
        e.stopPropagation();
    }
    state = {
        search: '',
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    render() {
        return (
            <Paper style={{height: '100%'}} elevation={4} square={true}>
                <FormControl fullWidth>
                    <Input
                        id="adornment-amount"
                        placeholder="Search by name or ticker"
                        value={this.state.search}
                        onChange={this.handleChange('search')}
                        startAdornment={
                            <InputAdornment position="start">
                                <SvgIcon>
                                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                                </SvgIcon>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <div style={{height: 'calc(100% - 32px)'}}>
                    <div className="crazy-scroll" style={{height:'100%'}}>
                        <CustomScroll heightRelativeToParent="100%">
                            <List>
                                {
                                // "id": 1, 
                                // "name": "Bitcoin", 
                                // "symbol": "BTC", 
                                // "website_slug": "bitcoin", 
                                // "rank": 1, 
                                // "circulating_supply": 17045725.0, 
                                // "total_supply": 17045725.0, 
                                // "max_supply": 21000000.0, 
                                // "quotes": {
                                //     "USD": {
                                //         "price": 8520.47, 
                                //         "volume_24h": 5450440000.0, 
                                //         "market_cap": 145237588491.0, 
                                //         "percent_change_1h": -0.14, 
                                //         "percent_change_24h": 2.6, 
                                //         "percent_change_7d": 0.59
                                //     }
                                // }, 
                                // "last_updated": 1526892871                    
                                this.props.cryptoDetailsStore.getCryptoList
                                    .filter(item=>item.name.toLowerCase().indexOf(this.state.search.toLowerCase())!=-1 || item.symbol.toLowerCase().indexOf(this.state.search.toLowerCase())!=-1)
                                    .map(item => {
                                            const {
                                                id,
                                                name,
                                                symbol,
                                                quotes,
                                                last_updated
                                            } = item;
                                            // console.log(name);
                                            // const path = `/CryptoIcons/SVG/${name}.svg`

                                            return  (
                                                    <ListItem key={id} divider={true} button={true} onClick={(e) => this.handleClick(e, item)}>
                                                        <img style={{height:'40px'}}  src={`/CryptoIcons/SVG/${name}.svg`} />
                                                        {/* <Avatar src={`/CryptoIcons/SVG/${name}.svg`} /> */}
                                                        <ListItemText primary={`${name}`} secondary={`$ ${quotes.USD.price}`} />
                                                    </ListItem>
                                            )
                                                            
                                            // return <Avatar key={id} src={`/CryptoIcons/SVG/${name}.svg`} />
                                        })
                                    }
                            </List>
                        </CustomScroll>
                    </div>
                </div>
            </Paper>

        );
    }
}

export default inject("cryptoDetailsStore")(observer(CurrencyList));