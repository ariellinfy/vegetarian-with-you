import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../redux/user/user-selectors';

import theme from './material-ui-theme';
import { ThemeProvider } from '@material-ui/core/styles';
import './App.css';

import Header from '../components/header/header-component';
import Footer from '../components/footer/footer-component';
import HomePage from './home-page/home-page-component';
import SignInAndSignUpPage from './signin-signup-page/signin-signup-page-component';
import AdminDashboardPage from './admin-dashboard-page/admin-dashboard-page-component';
import ExplorePage from './explore-page/explore-page-component';
import FindRestaurantPage from './find-restaurant-page/find-restaurant-page-component';
import CreateRestaurantPage from './create-restaurant-page/create-restaurant-page-component';
import UpdateRestaurantPage from './update-restaurant-page/update-restaurant-page-component';
import CreateReviewPage from './create-review-page/create-review-page-component';
import UpdateReviewPage from './update-review-page/update-review-page-component';
import RestaurantPage from './restaurant-page/restaurant-page-component';

const App = ({ currentUser, history }) => {
  return (
    <ThemeProvider theme={theme}>
        <div className='App'>
          <Header />
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/signin' render={() => Object.keys(currentUser).length ? (history.go(-1)) : (<SignInAndSignUpPage />)} />
              <Route exact path='/useraccount' render={() => Object.keys(currentUser).length ? (<AdminDashboardPage />) : (<SignInAndSignUpPage />)} />
              <Route exact path='/explore' component={ExplorePage} />
              <Route exact path='/find' component={FindRestaurantPage} />
              <Route exact path='/createrestaurant' render={() => Object.keys(currentUser).length ? (<CreateRestaurantPage />) : (<SignInAndSignUpPage />)} />
              <Route exact path='/createreview' render={() => Object.keys(currentUser).length ? (<CreateReviewPage />) : (<SignInAndSignUpPage />)} />
              <Route exact path='/updaterestaurant' render={() => Object.keys(currentUser).length ? (<UpdateRestaurantPage />) : (<SignInAndSignUpPage />)} />
              <Route exact path='/updatereview' render={() => Object.keys(currentUser).length ? (<UpdateReviewPage />) : (<SignInAndSignUpPage />)} />
              <Route path='/restaurants/:id' component={RestaurantPage} />
            </Switch>
          <Footer />
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default withRouter(connect(mapStateToProps, null)(App));
