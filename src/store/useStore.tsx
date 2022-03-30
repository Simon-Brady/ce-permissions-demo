import create from 'zustand';
import roles from '../../constants/roles.json';
import tags from '../../constants/tags.json';
import users from '../../constants/users.json';

type Roles = {
	[k: string]: { name: string; applied_tags_ids: number[] };
};
interface IStore {
	users: { name: string; role_id: number }[];
	tags: { [k: string]: { title: string } };
	roles: Roles;
	selectedRole: number;
	addTagToRole: (
		tag: { [k: string]: { title: string } },
		role_id: string
	) => void;
	setSelectedRole: (id: number) => void;
	// selectedRolePermissions: {
	// 	role_id: string[];
	// };
}

const typedRoles: Roles = roles;

const useStore = create<IStore>((set, get) => ({
	users: users.current_users,
	tags: tags,
	roles: roles,
	selectedRole: 1,
	// selectedRolePermissions: typedRoles[get().selectedRole.toString()],
	addTagToRole: (tag, role_id) => {
		console.log(tag, role_id);
	},
	setSelectedRole: (id) => {
		console.log('id hit!', id);
		return set({ selectedRole: id });
	},
}));

export default useStore;
