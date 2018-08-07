import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import NotFoundPage from './pages/not_found/NotFoundPage';
import HomePage from './pages/home/HomePage';
import { NotificationContainer } from 'react-notifications';
export class Main extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
        <NotificationContainer/>
      </div>
    );
  }
}

export default withRouter(Main);
