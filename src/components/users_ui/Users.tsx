import React from 'react';
import users from '../../../constants/users.json';
import roles from '../../../constants/roles.json';

type Roles = {
	[k: string]: Role;
};

type Role = {
	name: string;
	applied_tags_ids: number[];
};

const Users = () => {
	const typedRoles: Roles = roles;
	return (
		<div>
			<h1>Users</h1>
			{users.current_users.map((user, i) => {
				let idString: string = user.role_id.toString();
				let role: string = typedRoles[idString].name;
				return (
					<p key={i}>
						{user.name} - {role}
					</p>
				);
			})}
			<button>Add User Buttton</button>
		</div>
	);
};

export default Users;
