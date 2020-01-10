import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import './scss/App.css';

const Login = lazy(() => import('./pages/login'));
const Home = lazy(() => import('./pages/home'));

class App extends Component {
  token = () => {
    let path = this.props.location.pathname;
    if (!localStorage.getItem("TOKEN_WANTU_BG") && !/^\/login$/.test(path))
      this.props.history.push('/login');
  }
  componentDidMount() {
    this.token();
  }
  componentDidUpdate() {
    this.token();
  }
  render() {
    let token = localStorage.getItem("TOKEN_WANTU_BG");
    return (
      <div className="App">
        <Suspense fallback={<Icon type="loading" />}>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/home' component={Home} />
            <Route path='/notfound' render={() => <h1>你访问的页面不存在</h1>} />
            <Redirect from='/' to={token ? 'home' : 'login'} exact />
            <Redirect to='/' />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

App = withRouter(App);
export default App;
