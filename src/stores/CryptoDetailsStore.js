import { observable, computed, action, asMap, autorun, decorate, runInAction } from 'mobx';
import axios from 'axios';

class CryptoDetailsStore {
    // @observable show;
  
    constructor() {
      // this.show = false;
    }

    cryptoList = [];
    get getCryptoList() {
      return this.cryptoList;
    }

    
    selectedCurrency = null;
    setSelectedCurrency(val) {
      this.selectedCurrency = val;
    }

    get getSelectedCurrency() {
      return this.selectedCurrency;
    }

    loadCryptos = () => {
      axios("https://api.coinmarketcap.com/v2/ticker/?limit=20")
      // .then(resp => resp.json())
      .then(resp => {
        console.log("=========== loadCryptos ==================");
        
        console.log(resp);
        
        runInAction(()=>{
          this.cryptoList = Object.values(resp.data.data);
          this.setSelectedCurrency(this.cryptoList[0]);
        });
      });
    }

    loadCryptosAsync = async () => {
      const resp = await axios("https://api.coinmarketcap.com/v2/ticker/?limit=10");
      // const data = await resp.json();
      runInAction(()=>{
        this.cryptoList = Object.values(resp.data.data);
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

  decorate(CryptoDetailsStore, {
    cryptoList: observable,
    selectedCurrency: observable,
    loadCryptos: action,
    setSelectedCurrency: action,
    getSelectedCurrency: computed,
    getCryptoList: computed,
  });
  
  // const cryptoDetailsStore = new CryptoDetailsStore();
  
  // autorun(() => {
  //   console.log(cryptoDetailsStore.show);
  // });
  
  export default new CryptoDetailsStore();
  export { CryptoDetailsStore };
  