import React from 'react';
import { render } from 'react-dom'

import App from '@layouts/App'
import { BrowserRouter } from 'react-router-dom';

render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.querySelector('#app'))

// pages - service page
// components - small component
// layouts - common layout