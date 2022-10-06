import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import HomePage from 'Pages/HomePage';
import { loadScript } from 'untils/loadScripts/loadScripts';

function App() {
    loadScript();
    return (
        <div className="App">
            <Router>
                <HomePage />
            </Router>
        </div>
    );
}

export default App;
