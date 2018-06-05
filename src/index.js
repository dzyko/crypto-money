import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'mobx-react';
import cryptoDetailsStore from './stores/CryptoDetailsStore';
import cryptoChartStore from './stores/CryptoChartStore';
import themeStore from './stores/ThemeStore';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// const theme = createMuiTheme({
//     palette: {
//       type: 'dark', // light/dark
//     },
//   });

// ReactDOM.render(<MuiThemeProvider theme={theme}><Provider themeStore={themeStore} cryptoDetailsStore={cryptoDetailsStore} cryptoChartStore={cryptoChartStore}><App /></Provider></MuiThemeProvider>, document.getElementById('root'));
ReactDOM.render(
  <Provider 
    themeStore={themeStore} 
    cryptoDetailsStore={cryptoDetailsStore} 
    cryptoChartStore={cryptoChartStore}>
      <App />
  </Provider>, 
  document.getElementById('root'));

registerServiceWorker();
