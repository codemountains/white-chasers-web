import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/app/App';
import {store} from './app/store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import About from './pages/about/About';
import Terms from './pages/terms/Terms';
import Privacy from './pages/terms/Privacy';
import AppDetail from "./pages/app/AppDetail";

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#4fb3be',
			main: '#00838e',
			dark: '#005661',
			contrastText: '#ffffff',
		},
		secondary: {
			light: '#6d6d6d',
			main: '#424242',
			dark: '#1b1b1b',
			contrastText: '#ffffff',
		},
		error: {
			light: '#ff867a',
			main: '#ef534e',
			dark: '#b61825',
			contrastText: '#ffffff',
		},
		warning: {
			light: '#ffd95d',
			main: '#ffa726',
			dark: '#c77800',
			contrastText: '#ffffff',
		},
		info: {
			light: '#80d6ff',
			main: '#42a5f5',
			dark: '#0077c2',
			contrastText: '#ffffff',
		},
		success: {
			light: '#96ed98',
			main: '#64ba69',
			dark: '#31893d',
			contrastText: '#ffffff',
		},
	},
	typography: {
		fontSize: 14,
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		button: {
			textTransform: 'none'
		},
	},
	props: {
		MuiTextField: {
			variant: 'outlined'
		},
	},
})

ReactDOM.render(
	<React.StrictMode>
		<MuiThemeProvider theme={theme}>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<CookiesProvider>
					<Provider store={store}>
						<Switch>
							<Route exact path='/' component={App}/>
							<Route exact path='/about' component={About}/>
							<Route exact path='/terms' component={Terms}/>
							<Route exact path='/privacy' component={Privacy}/>
							<Route exact path='/details' component={AppDetail}/>
						</Switch>
					</Provider>
				</CookiesProvider>
			</BrowserRouter>
		</MuiThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorker.unregister();
