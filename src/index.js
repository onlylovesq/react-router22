import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
// import Home from "./components/Home";
// import UserList from "./components/UserList";
// import UserAdd from "./components/UserAdd";
import { KeepAliveProvider, withKeepAlive } from './keepalive-react-component';
const KeepAliveHome = withKeepAlive(Home, { cacheId: 'Home' });
const KeepAliveUserList = withKeepAlive(UserList, {
	cacheId: 'UserList',
	scroll: true,
});
const KeepAliveUserAdd = withKeepAlive(UserAdd, { cacheId: 'UserAdd' });

const Home = React.lazy(() =>
	import(/* webpackChunkName: "Home"*/'./components/Home')
);

const UserList = React.lazy(() =>
	import(/* webpackChunkName: "UserList"*/'./components/UserList')
);

const UserAdd = React.lazy(() =>
	import(/* webpackChunkName: "UserAdd"*/'./components/UserAdd')
);
const App = () => {
	return (
		<BrowserRouter>
			{/* <KeepAliveProvider> */}
			<ul>
				<li>
					<Link to='/'>首页</Link>
				</li>
				<li>
					<Link to='/list'>用户列表</Link>
				</li>
				<li>
					<Link to='/add'>添加用户</Link>
				</li>
			</ul>
			<Switch>
				{/* <Route path="/" component={KeepAliveHome} exact></Route> */}
				{/* <Route path="/list" component={KeepAliveUserList}></Route> */}
				{/* <Route path="/add" component={KeepAliveUserAdd}></Route> */}
				<Route path='/' component={Home} exact></Route>
				<Route path='/list' component={UserList}></Route>
				<Route path='/add' component={UserAdd}></Route>
			</Switch>
			{/* </KeepAliveProvider> */}
		</BrowserRouter>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
