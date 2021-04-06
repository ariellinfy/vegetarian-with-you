import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../redux/user/user-selectors';

import { createMuiTheme, makeStyles, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import { lightGreen, green, orange, deepOrange, yellow } from '@material-ui/core/colors';
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

let theme = createMuiTheme({
  palette: {
    primary: {
      main: lightGreen[800],
    },
    secondary: {
      main: orange[800],
    },
    tertiary: {
      main: yellow[500],
    },
    warning: {
      main: deepOrange[600],
    },
    
  },
  typography: {
    fontFamily: '-apple-system, Quicksand, sans-serif'
  },
});

theme = responsiveFontSizes(theme);

const App = ({ currentUser }) => {
  return (
    <ThemeProvider theme={theme}>
        <div className='App'>
          <Header />
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/signin' render={() => Object.keys(currentUser).length ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
              <Route exact path='/useraccount' component={AdminDashboardPage} />
              <Route exact path='/explore' component={ExplorePage} />
              <Route exact path='/find' component={FindRestaurantPage} />
              <Route exact path='/createrestaurant' component={CreateRestaurantPage} />
              <Route exact path='/createreview' component={CreateReviewPage} />
              <Route exact path='/updaterestaurant' component={UpdateRestaurantPage} />
              <Route exact path='/updatereview' component={UpdateReviewPage} />
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

export default connect(mapStateToProps, null)(App);
