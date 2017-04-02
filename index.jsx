import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';

import './reset.scss';

import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import Application from './src/Aplication.jsx';

import rootReducer, {initState} from './src/reducers';
import sagas from './src/sagas';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

const finalCreateStore = compose(
    applyMiddleware(
        sagaMiddleware,
        logger,
    ),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)(createStore);

const store = finalCreateStore(rootReducer, initState);

sagaMiddleware.run(sagas);

render(
    <Provider store={store}>
        <Application />
    </Provider>,
    document.getElementById('root')
);
