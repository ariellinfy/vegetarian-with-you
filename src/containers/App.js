import React from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
import CreateRestaurantPage from './create-restaurant-page/create-restaurant-page-component';

import './App.css';

const App = () => {
  return (
    <div>
      <CreateRestaurantPage />
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
