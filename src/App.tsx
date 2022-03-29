import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Navbar } from './components/Navbar';
import styled from '@emotion/styled';
import { Users } from './components/users_ui';
import { Permissions } from './components/permissions_ui';
import { Roles } from './components/Roles';
import { Tags } from './components/Tags';
import { useStore } from '../src/store';

const StyledWrapper = styled.div`
	padding: 0 8px 12px;
	.permissions-tags {
		display: flex;
		justify-content: space-between;
	}
`;

const App = () => {
	return (
		<>
			<Navbar />
			<StyledWrapper>
				<h1>Permissions</h1>
				<div className='permissions-tags'>
					<Permissions />
					<Tags />
				</div>
				<Roles />
				<Users />
			</StyledWrapper>
		</>
	);
};

export default hot(App);
