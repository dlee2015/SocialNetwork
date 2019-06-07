import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Alert from './component/layout/Alert';
import Login from './component/auth/Login';
import Register from './component/auth/Register';

//REDUX
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
	<Provider store={store}>
		<BrowserRouter>
			<Fragment>
				<Navbar />
				<Route path='/' exact component={Landing} />
				<section className='container'>
					<Alert />
					<Switch>
						<Route path='/register' component={Register} />
						<Route path='/login' component={Login} />
					</Switch>
				</section>
			</Fragment>
		</BrowserRouter>
	</Provider>
);

export default App;
