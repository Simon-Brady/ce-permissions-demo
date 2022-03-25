import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Navbar } from './components/Navbar';
const App = () => {
	return (
		<>
			<Navbar />
			<div>
				<h1>Permissions</h1>
				<div>
					<b>permissions container</b>
					<div>
						<h3>Roles container</h3>
						<div>Role</div>
						<div>Create Role Button</div>
					</div>
					<div>
						<h3>Tags Container</h3>
						<div>Tag</div>
						<div>Create Tag Group</div>
					</div>
				</div>
			</div>
			<div>
				<h1>Users</h1>
				<div>User</div>
				<div>Add User Buttton</div>
			</div>
		</>
	);
};

export default hot(App);
