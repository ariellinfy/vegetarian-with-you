import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../components/header/header-component';
import Footer from '../components/footer/footer-component';
import CreateRestaurantPage from './create-restaurant-page/create-restaurant-page-component';
import CreateReviewPage from './create-review-page/create-review-page-component';
import SignInAndSignUpPage from './signin-signup-page/signin-signup-page-component';
import RestaurantPage from './restaurant-page/restaurant-page-component';
import ExplorePage from './explore-page/explore-page-component';
import FindRestaurantPage from './find-restaurant-page/find-restaurant-page-component';
import AdminDashboardPage from './admin-dashboard-page/admin-dashboard-page-component';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      {/* <Header /> */}
      <Switch>
          {/* <Route exact path='/' component={HomePage} /> */}
          <Route exact path='/explore' component={ExplorePage} />
          <Route exact path='/find' component={FindRestaurantPage} />
          <Route exact path='/createrestaurant' component={CreateRestaurantPage} />
          <Route exact path='/createreview' component={CreateReviewPage} />
          <Route exact path='/restaurant' component={RestaurantPage} />
          {/* <Route exact path='/updaterestaurant' component={UpdateRestaurantPage} /> */}
          {/* <Route exact path='/updatereview' component={UpdateReviewPage} /> */}
          <Route exact path='/signin' component={SignInAndSignUpPage} />
          <Route exact path='/useraccount' component={AdminDashboardPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
