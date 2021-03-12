import React from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
import CreateRestaurantPage from './create-restaurant-page/create-restaurant-page-component';
import CreateReviewPage from './create-review-page/create-review-page-component';

import './App.css';

const App = () => {
  return (
    <div className='App'>
      <CreateRestaurantPage />
      <CreateReviewPage />
      {/* <Header />
      <Switch>
        <Suspense>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/explore' component={ExplorePage} />
          <Route exact path='/createreview' component={CreateReviewPage} />
          <Route exact path='/updatereview' component={UpdateReviewPage} />
          <Route exact path='/signin' render={() => currentUserToken ? (<Redirect to='/myreviews' />) : (<SignInSignUpPage />)} />
        </Suspense>
      </Switch>
      <Footer /> */}
    </div>
  );
}

export default App;
