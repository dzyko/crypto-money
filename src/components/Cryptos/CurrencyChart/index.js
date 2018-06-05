import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {observable, observe} from 'mobx';

import Highcharts from 'highcharts/highcharts';
// import {} from 'highcharts/js/themes/gray.js';

import PropTypes from 'prop-types';
import { createMuiTheme, MuiThemeProvider, withStyles, withTheme } from '@material-ui/core/styles';
import classNames from 'classnames';

import Paper from '@material-ui/core/Paper';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';


const styles = theme => {
    // console.log("========== theme ===========");
    // console.log(theme);
    return {
        header: {
            padding: 0,
            "min-height": '32px',
        },
        colorInherit: {
            color: 'inherit',
        },
        divider: {
            flex: '0 0 100%',
        },
        typographySuccess: {
            ...theme.typography.title,
            color: green[500],
        },
        typographyError: {
            ...theme.typography.title,
            color: red[500],
        },
        typographyHeadline: {
            ...theme.typography.headline,
            color: theme.palette.primary.light,
        },
        typographyHeadlineSecondary: {
            ...theme.typography.headline,
            color: theme.palette.text.hint,
        },
        
    }
};

const themeLight = {
	colors: ['#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066',
		'#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
	chart: {
		backgroundColor: "#fff",
		style: {
			fontFamily: 'Dosis, sans-serif'
		}
	},
	title: {
		style: {
			color: '#AAA',
			fontSize: '16px',
			fontWeight: 'bold',
			textTransform: 'uppercase'
		}
	},
	tooltip: {
		borderWidth: 0,
		backgroundColor: 'rgba(219,219,216,0.8)',
		shadow: false,
		style: {
			color: '#000'
		}

	},
	legend: {
		itemStyle: {
			fontWeight: 'bold',
			fontSize: '13px'
		}
	},
	xAxis: {
		gridLineWidth: 1,
		labels: {
			style: {
				fontSize: '12px'
			}
		}
	},
	yAxis: {
		minorTickInterval: 'auto',
		title: {
			style: {
				textTransform: 'uppercase'
			}
		},
		labels: {
			style: {
				fontSize: '12px'
			}
		}
	},
	plotOptions: {
		candlestick: {
			lineColor: '#404048'
		}
	},
	// General
	background2: '#F0F0EA'
};

const themeDark = {
	colors: ['#6375ad', '#7798BF', '#55BF3B', '#DF5353', '#aaeeee',
		'#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
	chart: {
		backgroundColor: //'#424242',
		{
			linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
			stops: [
				[0, '#454545'],
				[1, '#323232']
			]
		},
		borderWidth: 0,
		borderRadius: 0,
		plotBackgroundColor: null,
		plotShadow: false,
		plotBorderWidth: 0
	},
	title: {
		style: {
			color: '#FFF',
			font: '16px Lucida Grande, Lucida Sans Unicode,' +
				' Verdana, Arial, Helvetica, sans-serif'
		}
	},
	subtitle: {
		style: {
			color: '#DDD',
			font: '12px Lucida Grande, Lucida Sans Unicode,' +
				' Verdana, Arial, Helvetica, sans-serif'
		}
	},
	xAxis: {
		gridLineWidth: 0,
		lineColor: '#999',
		tickColor: '#999',
		labels: {
			style: {
				color: '#999',
				fontWeight: 'bold'
			}
		},
		title: {
			style: {
				color: '#AAA',
				font: 'bold 12px Lucida Grande, Lucida Sans Unicode,' +
				' Verdana, Arial, Helvetica, sans-serif'
			}
		}
	},
	yAxis: {
		alternateGridColor: null,
		minorTickInterval: null,
		gridLineColor: 'rgba(255, 255, 255, .1)',
		minorGridLineColor: 'rgba(255,255,255,0.07)',
		lineWidth: 0,
		tickWidth: 0,
		labels: {
			style: {
				color: '#999',
				fontWeight: 'bold'
			}
		},
		title: {
			style: {
				color: '#AAA',
				font: 'bold 12px Lucida Grande, Lucida Sans Unicode,' +
				' Verdana, Arial, Helvetica, sans-serif'
			}
		}
	},
	legend: {
		itemStyle: {
			color: '#CCC'
		},
		itemHoverStyle: {
			color: '#FFF'
		},
		itemHiddenStyle: {
			color: '#333'
		}
	},
	labels: {
		style: {
			color: '#CCC'
		}
	},
	tooltip: {
		backgroundColor: {
			linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
			stops: [
				[0, 'rgba(96, 96, 96, .8)'],
				[1, 'rgba(16, 16, 16, .8)']
			]
		},
		borderWidth: 0,
		style: {
			color: '#FFF'
		}
	},


	plotOptions: {
		series: {
			nullColor: '#444444'
		},
		line: {
			dataLabels: {
				color: '#CCC'
			},
			marker: {
				lineColor: '#333'
			}
		},
		spline: {
			marker: {
				lineColor: '#333'
			}
		},
		scatter: {
			marker: {
				lineColor: '#333'
			}
		},
		candlestick: {
			lineColor: 'white'
		}
	},

	toolbar: {
		itemStyle: {
			color: '#CCC'
		}
	},

	navigation: {
		buttonOptions: {
			symbolStroke: '#DDDDDD',
			hoverSymbolStroke: '#FFFFFF',
			theme: {
				fill: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[0.4, '#606060'],
						[0.6, '#333333']
					]
				},
				stroke: '#000000'
			}
		}
	},

	// scroll charts
	rangeSelector: {
		buttonTheme: {
			fill: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0.4, '#888'],
					[0.6, '#555']
				]
			},
			stroke: '#000000',
			style: {
				color: '#CCC',
				fontWeight: 'bold'
			},
			states: {
				hover: {
					fill: {
						linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
						stops: [
							[0.4, '#BBB'],
							[0.6, '#888']
						]
					},
					stroke: '#000000',
					style: {
						color: 'white'
					}
				},
				select: {
					fill: {
						linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
						stops: [
							[0.1, '#000'],
							[0.3, '#333']
						]
					},
					stroke: '#000000',
					style: {
						color: 'yellow'
					}
				}
			}
		},
		inputStyle: {
			backgroundColor: '#333',
			color: 'silver'
		},
		labelStyle: {
			color: 'silver'
		}
	},

	navigator: {
		handles: {
			backgroundColor: '#666',
			borderColor: '#AAA'
		},
		outlineColor: '#CCC',
		maskFill: 'rgba(16, 16, 16, 0.5)',
		series: {
			color: '#7798BF',
			lineColor: '#A6C7ED'
		}
	},

	scrollbar: {
		barBackgroundColor: {
			linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
			stops: [
				[0.4, '#888'],
				[0.6, '#555']
			]
		},
		barBorderColor: '#CCC',
		buttonArrowColor: '#CCC',
		buttonBackgroundColor: {
			linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
			stops: [
				[0.4, '#888'],
				[0.6, '#555']
			]
		},
		buttonBorderColor: '#CCC',
		rifleColor: '#FFF',
		trackBackgroundColor: {
			linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
			stops: [
				[0, '#000'],
				[1, '#333']
			]
		},
		trackBorderColor: '#666'
	},

	// special colors for some of the demo examples
	legendBackgroundColor: 'rgba(48, 48, 48, 0.8)',
	background2: 'rgb(70, 70, 70)',
	dataLabelsColor: '#444',
	textColor: '#E0E0E0',
	maskColor: 'rgba(255,255,255,0.3)'
};



class CurrencyChart extends Component {
    // constructor(props) {
    //     super(props);
    // }
    myChart = {}

    componentWillMount(){
        // if(this.props.cryptoDetailsStore) {
        //     console.log(this.props.cryptoDetailsStore);
        //     console.log(this.props.cryptoDetailsStore.selectedCurrency);
        
        //     this.props.cryptoDetailsStore.getSelectedCurrency.$mobx
        //     .observe(change => console.log(change.newValue));
        // }
        const disposer = observe(this.props.cryptoDetailsStore, (change) => {
            if(change.name==="selectedCurrency" && change.type==="update")
            {
                // console.log(change.type, change.name, "from", change.oldValue, "to", change.object[change.name]);
                const {
                    id,
                    name,
                    symbol,
                    quotes,
                    last_updated
                } = change.object[change.name];
        
                this.props.cryptoChartStore.loadHistorycalCurrencyData(symbol);
            }
		});
		
        const disposer2 = observe(this.props.themeStore, (change) => {
			if(change.name==="currentTheme"){
				console.log(change.type, change.name, "from", change.oldValue, "to", change.object[change.name]);				
			}
            if(change.name==="currentTheme" && change.type==="update")
            {
                // console.log(change.type, change.name, "from", change.oldValue, "to", change.object[change.name]);
                const {
                    palette,
				} = change.object[change.name];
				if(palette.type==="light"){
					this.myChart.update(themeLight);
				}
				else {
					this.myChart.update(themeDark);
				}
        
                // this.props.cryptoChartStore.loadHistorycalCurrencyData(symbol);
            }
        });
        
        
	}
    componentDidMount() {
		// console.log("============= Highcharts.theme =============");
		// console.log(JSON.stringify(Highcharts.defaultOptions, null, 4));
		console.log("============= chart DidMount ==============");
		
		

		// Apply the theme
		this.props.theme.palette.type==="dark" ? Highcharts.setOptions(themeDark) : Highcharts.setOptions(themeLight);
		// Highcharts.setOptions(Highcharts.theme);

        // console.log(myChart);
        // Highcharts.theme = {
        //     colors: ['#058DC7', '#10B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', 
        //              '#FF9655', '#FFF263', '#6AF9C4'],
        //     chart: {
        //         backgroundColor: {
        //             linearGradient: [0, 0, 500, 500],
        //             stops: [
        //                 [0, 'rgb(255, 255, 255)'],
        //                 [1, 'rgb(240, 240, 255)']
        //             ]
        //         },
        //     },
        //     title: {
        //         style: {
        //             color: '#000',
        //             font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
        //         }
        //     },
        //     subtitle: {
        //         style: {
        //             color: '#666666',
        //             font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
        //         }
        //     },
        
        //     legend: {
        //         itemStyle: {
        //             font: '9pt Trebuchet MS, Verdana, sans-serif',
        //             color: 'black'
        //         },
        //         itemHoverStyle:{
        //             color: 'gray'
        //         }   
        //     }
        // };
        // Highcharts.setOptions(Highcharts.theme);

        this.myChart = Highcharts.chart('container', {
            chart: {
                // type: 'spline'
            },
            title: {
                text: 'Currency chart'
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%e %b'
                },
                // min: Date.UTC(2010, 2, 1)
                // categories: ['Apples', 'Bananas', 'Oranges']
            },
            yAxis: {
                title: {
                    text: 'Currency'
                }
            },
            series: [{
                name: '',
                data: [],
            }]
        });
        // myChart.series[0].setData([1,2,3,4,5]);
        
        
    }
    
    //         {
    //             "time": 1525802400,
    //             "close": 9223.37,
    //             "high": 9251.42,
    //             "low": 9081.16,
    //             "open": 9133.22,
    //             "volumefrom": 4724.46,
    //             "volumeto": 43461853.19
    //         },

    render() {
		const { classes, theme: currTheme } = this.props;
		const themeStore = this.props.themeStore;
        const {
            id,
            name,
            symbol,
            quotes,
            last_updated
        } = this.props.cryptoDetailsStore.getSelectedCurrency?this.props.cryptoDetailsStore.getSelectedCurrency:{};
    
        return (
            <Paper style={{height: '100%'}} elevation={4} square={true}>
                {
                    (this.props.cryptoChartStore.historycalCurrencyData && this.myChart.series) &&
                        (
                            this.myChart.series[0].update({name:symbol, data:this.props.cryptoChartStore.historycalCurrencyData.map(item=>([item.time*1000, item.close]))})
                            // this.myChart.series[0].setData(this.props.cryptoChartStore.historycalCurrencyData.map(item=>([item.time*1000, item.close])))
                        )
                }
                {/* <span className={classes.typographyHeadlineSecondary}>CurrencyChart</span> */}
                <div id="container" style={{width: '100%', height: '100%'}}></div>
            </Paper>
        )
    }
}
CurrencyChart.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true, name: 'myCurrencyChart' })(inject("cryptoDetailsStore", "cryptoChartStore", "themeStore")(observer(CurrencyChart)));
