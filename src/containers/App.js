import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectAuthSuccessMessage, selectAuthErrorMessage } from '../redux/user/user-selectors';
import { selectReviewSuccessMessage, selectReviewErrorMessage } from '../redux/review/review-selectors';
import { checkUserSessionStart } from '../redux/user/user-actions';

import theme from './material-ui-theme';
import { ThemeProvider } from '@material-ui/core/styles';
import './App.css';

import Loader from '../components/loading/loading-component';
import Header from '../components/header/header-component';
import Toast from '../components/snack-bar/snack-bar-component';
import Footer from '../components/footer/footer-component';
import SessionTimeout from '../components/auto-logout/auto-logout-component';
import ErrorBoundary from '../components/error-boundary/error-boundary-component';
const HomePage = lazy(() => import('./home-page/home-page-component'));
const SignInAndSignUpPage = lazy(() => import('./signin-signup-page/signin-signup-page-component'));
const AdminDashboardPage = lazy(() => import('./admin-dashboard-page/admin-dashboard-page-component')); 
const ExplorePage = lazy(() => import('./explore-page/explore-page-component')); 
const FindRestaurantPage = lazy(() => import('./find-restaurant-page/find-restaurant-page-component')); 
const CreateRestaurantPage = lazy(() => import('./create-restaurant-page/create-restaurant-page-component')); 
const UpdateRestaurantPage = lazy(() => import('./update-restaurant-page/update-restaurant-page-component')); 
const CreateReviewPage = lazy(() => import('./create-review-page/create-review-page-component')); 
const UpdateReviewPage = lazy(() => import('./update-review-page/update-review-page-component')); 
const RestaurantPage = lazy(() => import('./restaurant-page/restaurant-page-component')); 
const RestaurantGalleryPage = lazy(() => import('./restaurant-gallery-page/restaurant-gallery-page-component')); 

const App = ({ currentUser, authSuccessMessage, authErrorMessage, reviewSuccessMessage, reviewErrorMessage, 
  checkUserSessionStart, history }) => {

  useEffect(() => {
    if (Object.keys(currentUser).length) {
      const currentUserToken = JSON.parse(localStorage.getItem('userToken')).token;
      checkUserSessionStart({ currentUserToken });
    };
    // eslint-disable-next-line
  }, [checkUserSessionStart]);

  return (
    <ThemeProvider theme={theme}>
        <div className='App'>
          <Header />
          {
            authSuccessMessage.length || authErrorMessage.length ? <Toast successMessage={authSuccessMessage} errorMessage={authErrorMessage} /> : null
          }
          {
            reviewSuccessMessage.length || reviewErrorMessage.length ? <Toast successMessage={reviewSuccessMessage} errorMessage={reviewErrorMessage} /> : null
          }
            <Switch>
              <ErrorBoundary>
                <Suspense fallback={<Loader />}>
                  <Route exact path='/' component={HomePage} />
                  <Route exact path='/signin' render={() => Object.keys(currentUser).length ? (history.go(-1)) : (<SignInAndSignUpPage />)} />
                  <Route exact path='/useraccount' render={() => Object.keys(currentUser).length ? (<AdminDashboardPage />) : (<SignInAndSignUpPage />)} />
                  <Route exact path='/explore' component={ExplorePage} />
                  <Route exact path='/find' component={FindRestaurantPage} />
                  <Route exact path='/createrestaurant' render={() => Object.keys(currentUser).length ? (<CreateRestaurantPage />) : (<SignInAndSignUpPage />)} />
                  <Route exact path='/createreview' render={() => Object.keys(currentUser).length ? (<CreateReviewPage />) : (<SignInAndSignUpPage />)} />
                  <Route exact path='/updaterestaurant' render={() => Object.keys(currentUser).length ? (<UpdateRestaurantPage />) : (<SignInAndSignUpPage />)} />
                  <Route exact path='/updatereview' render={() => Object.keys(currentUser).length ? (<UpdateReviewPage />) : (<SignInAndSignUpPage />)} />
                  <Route exact path='/restaurants/:id' component={RestaurantPage} />
                  <Route exact path='/restaurants/:id/images' component={RestaurantGalleryPage} />
                </Suspense>
              </ErrorBoundary>
            </Switch>
          <Footer />
        </div>
      <SessionTimeout currentUser={currentUser} />
    </ThemeProvider>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  authSuccessMessage: selectAuthSuccessMessage,
  authErrorMessage: selectAuthErrorMessage,
  reviewSuccessMessage: selectReviewSuccessMessage,
  reviewErrorMessage: selectReviewErrorMessage,
});

const mapDispatchToProps = dispatch => ({
  checkUserSessionStart: token => dispatch(checkUserSessionStart(token)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
