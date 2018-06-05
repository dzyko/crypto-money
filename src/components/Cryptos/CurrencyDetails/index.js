import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
// import './CurrencyDetails.css';

import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import Divider from '@material-ui/core/Divider';

import PropTypes from 'prop-types';
import { createMuiTheme, MuiThemeProvider, withStyles, withTheme } from '@material-ui/core/styles';
import classNames from 'classnames';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';


const styles = theme => {
    // console.log("========== theme ===========");
    // console.log(theme);
    
    return {
        root: {
            display: 'inline-block',
          },
        header: {
            padding: 0,
            "min-height": '32px',
        },
        typographySuccess: {
            ...theme.typography.title,
            color: green[500],
        },
        typographyError: {
            ...theme.typography.title,
            color: red[500],
        },
    }
};

class CurrencyDetails extends Component {
    componentDidMount() {
        // this.props.cryptoDetailsStore.loadCryptos();
    }
    

    render() {
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
        const { classes, theme: currTheme } = this.props;
        
        const {
            id,
            name,
            symbol,
            quotes,
            last_updated
        } = this.props.cryptoDetailsStore.getSelectedCurrency?this.props.cryptoDetailsStore.getSelectedCurrency:{};

        let containerStyle = {
            display: 'flex',
            height: 'calc(100% - 2px)',
            alignItems: 'stretch',
            flexWrap: 'wrap',
            padding: '10px',
            justifyContent: 'flex-start',
        };

        let itemStyle = {
            flex: '1 0 200px',
            textAlign: 'left',
            padding: '10px',
        };

        let subItemStyle = {
            display:'flex', 
            justifyContent:'flex-start', 
            alignItems: 'center',
            flex: '1 1 220px',
        };

        return (
            <Paper style={{height: '100%'}} elevation={4} square={true}>
                {
                    this.props.cryptoDetailsStore.getSelectedCurrency && (
                        <div style={containerStyle}>
                            <div style={{...subItemStyle, alignSelf: 'stretch', marginBottom: '10px'}}>
                                <img style={{height:'40px'}}  src={`/CryptoIcons/SVG/${name}.svg`} />
                                <span style={{...currTheme.typography.title, margin:0}}>&nbsp;&nbsp;&nbsp;{name}</span>
                                <span style={{...currTheme.typography.subheading, color: currTheme.palette.grey["500"], fontWeight: '600'}}>&nbsp;({symbol})</span>
                            </div>
                            <div style={{...subItemStyle, alignSelf: 'stretch', marginBottom: '10px'}}>
                                <span style={currTheme.typography.title}>{`$${quotes.USD.price.toLocaleString()} `}</span>
                                <span style={{...currTheme.typography.caption, paddingTop: '6px'}}>&nbsp;USD&nbsp;</span>
                                <span 
                                    className={
                                        classNames({
                                            [classes.typographySuccess]: quotes.USD.percent_change_24h >= 0,
                                            [classes.typographyError]: quotes.USD.percent_change_24h < 0,
                                        })
                                    }>
                                    ({quotes.USD.percent_change_24h.toLocaleString()}%)
                                </span>
                                <span style={{...currTheme.typography.caption, paddingTop: '6px'}}>&nbsp;24h&nbsp;</span>
                            </div>
                            <div style={{...subItemStyle, flexDirection: 'column', alignItems: 'stretch', padding: '10px 0 10px 0'}}>
                                <Divider />
                                <span style={{...currTheme.typography.body1, alignSelf: 'flex-start', margin:0, color: currTheme.palette.grey["500"]}}>Market Cap</span>
                                <Divider />
                                <span style={{...currTheme.typography.subheading, alignSelf: 'flex-start'}}>{`$${quotes.USD.market_cap.toLocaleString()}`}<span style={{...currTheme.typography.caption, paddingTop: '6px'}}>&nbsp;USD&nbsp;</span></span>
                            </div>
                            <div style={{...subItemStyle, flexDirection: 'column', alignItems: 'stretch', padding: '10px 0 10px 0'}}>
                                <Divider />
                                <span style={{...currTheme.typography.body1, alignSelf: 'flex-start', margin:0, color: currTheme.palette.grey["500"]}}>Volume (24h)</span>
                                <Divider />
                                <span style={{...currTheme.typography.subheading, alignSelf: 'flex-start'}}>{`$${quotes.USD.volume_24h.toLocaleString()}`}<span style={{...currTheme.typography.caption, paddingTop: '6px'}}>&nbsp;USD&nbsp;</span></span>
                            </div>
                        </div>
                    )
                }
            </Paper>
        )
    }
}
CurrencyDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true, name: 'myCurrencyDetails' })(inject("cryptoDetailsStore")(observer(CurrencyDetails)));
