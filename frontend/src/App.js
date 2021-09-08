import './component/CSS/main.css'


import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import React, { useEffect } from 'react'
import Alerting from './component/UI/Alert';
import AuthReducer from './store/reducers/AuthReducer';
import AlertReducer from './store/reducers/AlertReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Navb from './component/UI/Nav';
import Login from './screens/Login';
import Register from './screens/Register';
// import Post from './screens/Post';
// import PostById from './screens/PostById';
import Profiles from './screens/Profiles';
import Dashboard from './screens/Dashboard';
import AddEdu from './component/Profile/AddEdu';
import AddExp from './component/Profile/AddExp';
import PrivateRoute from './Routing/PrivateRoute';
import SetAuthToken from './utils/SettingAuhtToken';
import ProfileDetail from './Profiles/ProfileDetail';
import PostReducer from './store/reducers/PostReducer';
import { LoadUser } from './store/actions/AuthActions';
import EditProfile from './component/Profile/EditProfile';
import ProfileReducers from './store/reducers/ProfileReducer';
import CreateProfile from './component/Profile/CreateProfile';
import Footing from './component/UI/footer';
import Lay from './component/UI/Lay';
import PostById from './screens/PostById';
import Post from './screens/Post';
import Check from './component/posts/Check';
import Desk from './component/Dashboard/Desk';
// import Landing from './component/UI/Landing';


const rootReducer = combineReducers({
  auth: AuthReducer,
  alert: AlertReducer,
  profile: ProfileReducers,
  post: PostReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))


const Token = localStorage.getItem('token')
if (Token) {
  SetAuthToken(Token);
};


function App() {


  useEffect(
    () => store.dispatch(LoadUser()),
    [LoadUser]
  )

  return (
    
    <Provider store={store} >

      <Router>
        <Navb />
        <Alerting />


        <main style={{ height: "90vh" }} >
          <Route exact path='/' component={Lay} />
          

          <Switch>

            <PrivateRoute exact path='/post' component={Post} />
            <PrivateRoute exact path="/posTById/:id" component={PostById} />

            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />

            <PrivateRoute exact path='/addEdu' component={AddEdu} />
            <PrivateRoute exact path='/addExp' component={AddExp} />
            <PrivateRoute exact path="/profiles" component={Profiles} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            <PrivateRoute exact path='/profileDetailById/:id' component={ProfileDetail} />
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />

          </Switch>
        </main>
        {/* <Footing /> */}
      </Router>
    </Provider>
  );
}

export default App;



