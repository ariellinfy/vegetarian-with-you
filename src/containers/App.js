import React, { Suspense } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import CreateReviewPage from './create-review-page/create-review-page-component';

import './App.css';

const App = () => {
  return (
    <div>
      {/* <Header /> */}
      <Switch>
        <Suspense>
          {/* <Route exact path='/' component={HomePage} />
          <Route exact path='/explore' component={ExplorePage} /> */}
          <Route exact path='/createreview' component={CreateReviewPage} />
          {/* <Route exact path='/updatereview' component={UpdateReviewPage} />
          <Route exact path='/signin' render={() => currentUserToken ? (<Redirect to='/myreviews' />) : (<SignInSignUpPage />)} /> */}
        </Suspense>
      </Switch>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
