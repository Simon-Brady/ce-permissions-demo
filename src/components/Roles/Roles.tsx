import React from 'react';
import roles from '../../../constants/roles.json';
import { useStore } from '../../../src/store';

const Roles = () => {
	const { setSelectedRole } = useStore();

	return (
		<>
			<h3>Roles container</h3>
			{Object.entries(roles).map(([key, val], i) => {
				console.log(key, val, i);
				return (
					<p key={i} onClick={() => setSelectedRole(Number(key))}>
						{val.name}
					</p>
				);
			})}
			<button>Create Role Button</button>
		</>
	);
};

export default Roles;
