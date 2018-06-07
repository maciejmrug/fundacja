import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ChildrenList from './components/ChildrenList';
import { Action } from './state/actions';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { appStateReducer } from './state/reducers';
import { AppState } from './model/AppState';

import './index.css';
import Navbar from './components/Navbar';

const store = createStore<AppState, Action, {}, {}>(appStateReducer, {
  children: [
    {
      id: '1',
      name: 'Some',
      description: 'Desc'
    },
    {
      id: '2',
      name: 'Some2',
      description: 'Desc2'
    }
  ],
  gifts: [
    {
      id: '1',
      childId: '1',
      name: 'Gift'
    },
    {
      id: '2',
      childId: '1',
      name: 'Gift'
    }
  ]
});

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Navbar />
      <ChildrenList />
    </div>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
