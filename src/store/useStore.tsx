import create from 'zustand';
import roles from '../../constants/roles.json';
import tags from '../../constants/tags.json';
import users from '../../constants/users.json';

interface IStore {
	users: { name: string; role_id: number }[];
	tags: { [k: string]: { title: string } };
	roles: { [k: string]: { name: string; applied_tags_ids: number[] } };
	selectedRole: number;
	addTagToRole: (
		tag: { [k: string]: { title: string } },
		role_id: string
	) => void;
	setSelectedRole: (id: number) => void;
}

const useStore = create<IStore>((set) => ({
	users: users.current_users,
	tags: tags,
	roles: roles,
	selectedRole: 1,
	addTagToRole: (tag, role_id) => {
		console.log(tag, role_id);
	},
	setSelectedRole: (id) => {
		console.log('id hit!', id);
		return set({ selectedRole: id });
	},
}));

export default useStore;
