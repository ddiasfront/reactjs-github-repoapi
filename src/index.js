import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import {Main} from './app/main';
import {Allrepos} from './app/allrepos';

import './index.scss';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path={'/'} component={Allrepos}/>
    <Route path="/:repoId" component={Allrepos}/>
    <Route path="*" component={Main}/>
  </Router>,
  document.getElementById('root')
);
