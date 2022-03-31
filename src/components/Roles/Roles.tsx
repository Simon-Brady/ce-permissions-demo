import React from 'react';
import roles from '../../../constants/roles.json';
import { useStore } from '../../../src/store';
import styled from '@emotion/styled';

const StyledRolesWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 40px;
	p {
		cursor: pointer;
	}
	p.selected::after {
		content: '';
		margin-top: 5px;
		width: 100%;
		height: 2px;
		background: #8bdbbc;
		display: block;
	}
`;

const Roles = () => {
	const { setSelectedRole, setRefreshTags, selectedRole } = useStore();

	const handleRoleChange = (key: number) => {
		setRefreshTags(true);
		setSelectedRole(key);
	};

	return (
		<StyledRolesWrapper>
			<h3>Roles</h3>
			{Object.entries(roles).map(([key, val], i) => {
				return (
					<p
						key={i}
						onClick={() => handleRoleChange(Number(key))}
						className={`${
							selectedRole === Number(key) ? `selected` : `non-selected`
						}`}
					>
						{val.name}
					</p>
				);
			})}
			{/* <button>Create Role Button</button> */}
		</StyledRolesWrapper>
	);
};

export default Roles;
