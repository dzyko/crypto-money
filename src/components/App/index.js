import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

import './App.css';
import Button from '@material-ui/core/Button';
import {} from 'particles.js';
import Cryptos from '../Cryptos';
import {Provider} from 'mobx-react';
import cryptoDetailsStore from '../../stores/CryptoDetailsStore';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import LightbulbOutline from './svgIcons/LightbulbOutline';
import LightbublFull from './svgIcons/LightbublFull';
import Github from './svgIcons/GitHub';
import { createMuiTheme, MuiThemeProvider, withStyles, withTheme } from '@material-ui/core/styles';


const styles1 = theme => {
    return {
        header: {
            'position': 'relative',
            'display': 'flex',
            'backgroundColor': theme.palette.type==="dark" ? "#413e5d" : theme.palette.primary.light,
            'boxShadow': '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',        
            'height': '130px',
            'padding': '1px',
            'color': 'white',
            '@media all and (max-width: 500px)': {
                'height': '60px',
            }
        },
    }
};

class AppContent_ extends Component {
    handleTogglePaletteType = () => {
        this.props.themeStore.changeCurrentTheme();
    };
    
    render() {
        const { classes, theme: currTheme } = this.props;
    
        return (            
            <div className="App">
                <header className={classes.header}>
                    <div style={{position: 'absolute', width: '100%', height: '100%'}} id="particles-js"></div>
                    <div style={{position: 'absolute', right: '50px'}}>
                        <Tooltip classes={{root:classes.appbar}} id="appbar-theme" title="Toggle light/dark theme" enterDelay={300}>
                            <IconButton
                                color="inherit"
                                onClick={this.handleTogglePaletteType}
                                aria-labelledby="appbar-theme"
                            >
                                {(currTheme.palette.type === 'light') ? <LightbulbOutline /> : <LightbublFull />}
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div style={{position: 'absolute', right: '0'}}>
                        <Tooltip classes={{root:classes.appbar}} className={classes.appbar} id="appbar-github" title="GitHub repository" enterDelay={300}>
                            <IconButton
                                component="a"
                                color="inherit"
                                href="https://github.com/dzyko/crypto-money"
                                aria-labelledby="appbar-github"
                                target="_blank"
                            >
                                <Github />
                            </IconButton>
                        </Tooltip>
                    </div>
                </header>
                <Cryptos />
            </div>
        );
    }
}

AppContent_.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const AppContent = withStyles(styles1, { withTheme: true, name: 'AppContent' })(inject("themeStore")(observer(AppContent_)));


class App extends Component {
  componentDidMount() {
    window.particlesJS("particles-js", {
      "particles": {
          "number": {
              "value": 20,
              "density": {
                  "enable": false,
                  "value_area": 400
              }
          },
          "color": {
              "value": "#ffffff"
          },
          "shape": {
              "type": "circle",
              "stroke": {
                  "width": 0,
                  "color": "#000000"
              },
              "polygon": {
                  "nb_sides": 5
              },
              "image": {
                  "src": "img/github.svg",
                  "width": 100,
                  "height": 100
              }
          },
          "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                  "enable": false,
                  "speed": 1,
                  "opacity_min": 0.1,
                  "sync": false
              }
          },
          "size": {
              "value": 5,
              "random": true,
              "anim": {
                  "enable": false,
                  "speed": 40,
                  "size_min": 0.1,
                  "sync": false
              }
          },
          "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#ffffff",
              "opacity": 0.4,
              "width": 1
          },
          "move": {
              "enable": true,
              "speed": 6,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                  "enable": false,
                  "rotateX": 600,
                  "rotateY": 1200
              }
          }
      },
      "interactivity": {
          "detect_on": "canvas",
          "events": {
              "onhover": {
                  "enable": true,
                  "mode": "grab"
              },
              "onclick": {
                  "enable": false,
                  "mode": "push"
              },
              "resize": true
          },
          "modes": {
              "grab": {
                  "distance": 400,
                  "line_linked": {
                      "opacity": 1
                  }
              },
              "bubble": {
                  "distance": 400,
                  "size": 40,
                  "duration": 2,
                  "opacity": 8,
                  "speed": 3
              },
              "repulse": {
                  "distance": 200,
                  "duration": 0.4
              },
              "push": {
                  "particles_nb": 4
              },
              "remove": {
                  "particles_nb": 2
              }
          }
      },
      "retina_detect": true
    });
  }
  
  render() {
    const { classes } = this.props;
    const themeStore = this.props.themeStore;

    return (
        <MuiThemeProvider theme={this.props.themeStore.getCurrentTheme}>
            <CssBaseline />
            <AppContent />
        </MuiThemeProvider>
    );
  }
}

export default inject("themeStore")(observer(App));
