import { observable, computed, action, asMap, autorun, decorate, runInAction } from 'mobx';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


class ThemeStore {
    constructor() {
    
    }
    themeDark = createMuiTheme({
        palette: {
          type: 'dark', // light/dark
        },
    });
    themeLight = createMuiTheme({
        palette: {
            type: 'light', // light/dark
        },
    });

    currentTheme = this.themeDark;

    get getCurrentTheme() {
      return this.currentTheme;
    }

    changeCurrentTheme(){
        // console.log(this.currentTheme.palette.type);
        
        if(this.currentTheme.palette.type === 'light') {
            this.currentTheme = this.themeDark;
        }
        else {
            this.currentTheme = this.themeLight;
        }
    }
}

decorate(ThemeStore, {
    currentTheme: observable,
    changeCurrentTheme: action,
    getCurrentTheme: computed,
});
  
  
export default new ThemeStore();
export { ThemeStore };
  