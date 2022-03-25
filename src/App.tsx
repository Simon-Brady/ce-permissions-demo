import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Navbar } from './components/Navbar';
import styled from '@emotion/styled';

const StyledWrapper = styled.div`
	padding: 0 8px 12px;
`;

const App = () => {
	return (
		<>
			<Navbar />
			<StyledWrapper>
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
			</StyledWrapper>
		</>
	);
};

export default hot(App);
