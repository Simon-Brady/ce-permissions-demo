import React from 'react';
import roles from '../../../constants/roles.json';
import { useStore } from '../../../src/store';

const Roles = () => {
	const { setSelectedRole, setRefreshTags } = useStore();

	const handleRoleChange = (key: number) => {
		setRefreshTags(true);
		setSelectedRole(key);
	};

	return (
		<>
			<h3>Roles container</h3>
			{Object.entries(roles).map(([key, val], i) => {
				return (
					<p key={i} onClick={() => handleRoleChange(Number(key))}>
						{val.name}
					</p>
				);
			})}
			{/* <button>Create Role Button</button> */}
		</>
	);
};

export default Roles;
