import { observable, computed, action, asMap, autorun, decorate, runInAction } from 'mobx';
import axios from 'axios';

class CryptoChartStore {
    constructor() {
    }

    historycalCurrencyData = [];

    loadHistorycalCurrencyData = (item) => {
      // console.log("=========== loadHistorycalCurrencyData ============");
      // console.log(item);
      
    //   {
    //     "Response": "Success",
    //     "Type": 100,
    //     "Aggregated": false,
    //     "Data": [
    //         {
    //             "time": 1525795200,
    //             "close": 9136.61,
    //             "high": 9189.79,
    //             "low": 9121.45,
    //             "open": 9189.54,
    //             "volumefrom": 2629.3,
    //             "volumeto": 24105725.04
    //         },
    //         {
    //             "time": 1525798800,
    //             "close": 9133.17,
    //             "high": 9169.58,
    //             "low": 9126.88,
    //             "open": 9136.15,
    //             "volumefrom": 1580.14,
    //             "volumeto": 14505014.26
    //         },
    //         {
    //             "time": 1525802400,
    //             "close": 9223.37,
    //             "high": 9251.42,
    //             "low": 9081.16,
    //             "open": 9133.22,
    //             "volumefrom": 4724.46,
    //             "volumeto": 43461853.19
    //         },
    //         {
    //             "time": 1525806000,
    //             "close": 9254.96,
    //             "high": 9265.05,
    //             "low": 9215.6,
    //             "open": 9223.16,
    //             "volumefrom": 2271.83,
    //             "volumeto": 21038135.44
    //         },
    //         {
    //             "time": 1525809600,
    //             "close": 9173.96,
    //             "high": 9253.16,
    //             "low": 9171.67,
    //             "open": 9249.97,
    //             "volumefrom": 2387.5,
    //             "volumeto": 22076971.56
    //         },
    //         {
    //             "time": 1525813200,
    //             "close": 9199.26,
    //             "high": 9237.12,
    //             "low": 9173.62,
    //             "open": 9173.96,
    //             "volumefrom": 1520.41,
    //             "volumeto": 14045444.48
    //         },
    //         {
    //             "time": 1525816800,
    //             "close": 9214.87,
    //             "high": 9256.51,
    //             "low": 9199.14,
    //             "open": 9199.26,
    //             "volumefrom": 1991.16,
    //             "volumeto": 18450455.44
    //         },
    //         {
    //             "time": 1525820400,
    //             "close": 9196.13,
    //             "high": 9262.41,
    //             "low": 9190.31,
    //             "open": 9214.87,
    //             "volumefrom": 2564.04,
    //             "volumeto": 23734724.07
    //         },
    //         {
    //             "time": 1525824000,
    //             "close": 9138.61,
    //             "high": 9204.71,
    //             "low": 9137.56,
    //             "open": 9196.13,
    //             "volumefrom": 2460.45,
    //             "volumeto": 22619904.4
    //         },
    //         {
    //             "time": 1525827600,
    //             "close": 9173.02,
    //             "high": 9179.73,
    //             "low": 9137.5,
    //             "open": 9138.62,
    //             "volumefrom": 977.43,
    //             "volumeto": 8989864
    //         },
    //         {
    //             "time": 1525831200,
    //             "close": 9094.69,
    //             "high": 9175.21,
    //             "low": 9089.32,
    //             "open": 9172.57,
    //             "volumefrom": 3371.7,
    //             "volumeto": 30818549.21
    //         }
    //     ],
    //     "TimeTo": 1525831200,
    //     "TimeFrom": 1525795200,
    //     "FirstValueInArray": true,
    //     "ConversionType": {
    //         "type": "direct",
    //         "conversionSymbol": ""
    //     }
    // }



      axios.get(`https://min-api.cryptocompare.com/data/histohour?fsym=${item}&tsym=USD&toTs=${Math.round(Date.now()/1000)}&limit=30`)
      .then(resp => {
        // console.log("=========== loaded HistorycalCurrencyData ==================");
        // console.log(resp);
        
        runInAction(()=>{
          this.historycalCurrencyData = [...resp.data.Data];
        //   this.setSelectedCurrency(this.cryptoList[0]);
        });
      });
    }

    // @computed get isOpenLeftPanel() {
    //   return this.show;
    // }
  
    // @action('toggle left panel')
    // toggleLeftPanel() {
    //   this.show = !this.show;
    // }
  
    // @action('show left panel')
    // openLeftPanel() {
    //   this.show = true;
    // }
  
    // @action('hide left panel')
    // closeLeftPanel() {
    //   this.show = false;
    // }
  }

  decorate(CryptoChartStore, {
    historycalCurrencyData: observable,
    loadHistorycalCurrencyData: action,
  });
  
  
  export default new CryptoChartStore();
  export { CryptoChartStore };
  