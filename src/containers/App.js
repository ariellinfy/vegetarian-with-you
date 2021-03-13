import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CreateRestaurantPage from './create-restaurant-page/create-restaurant-page-component';
import CreateReviewPage from './create-review-page/create-review-page-component';
import SignInAndSignUpPage from './signin-signup-page/signin-signup-page-component';
import RestaurantPage from './restaurant-page/restaurant-page-component';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      {/* <Header /> */}
      <Switch>
          {/* <Route exact path='/' component={HomePage} /> */}
          {/* <Route exact path='/explore' component={ExplorePage} /> */}
          <Route exact path='/createrestaurant' component={CreateRestaurantPage} />
          <Route exact path='/createreview' component={CreateReviewPage} />
          {/* <Route exact path='/updatereview' component={UpdateReviewPage} /> */}
          <Route exact path='/signin' component={SignInAndSignUpPage} />
          <Route exact path='/restaurant' component={RestaurantPage} />
      </Switch>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
