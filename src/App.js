import React from 'react';
import Toolbar from "./components/Toolbar/Toolbar";
import { BoardAndMovements } from "./components/BoardGame/BoardGame";

import './App.css';

function App() {

	return (
		<div style={{ height: '100%' }}>
			<Toolbar />
			<main style={{ marginTop: '20px' }}>
				<div className="container">
					<BoardAndMovements />
				</div>
			</main>

		</div>
	);
}

export default App;
