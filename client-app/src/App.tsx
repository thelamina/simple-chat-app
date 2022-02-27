import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Chat, Home } from './pages';
import './common/styles/styles.scss';

type Props = {
	children?: React.ReactNode;
};

function App({ children }: Props) {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='*' element={<div>404</div>} />
					<Route path='/chat' element={<Chat />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
