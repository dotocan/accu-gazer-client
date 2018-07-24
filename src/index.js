import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers/rootReducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const store = createStore(rootReducer, applyMiddleware(thunk), window.devToolsExtension && window.devToolsExtension());

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
