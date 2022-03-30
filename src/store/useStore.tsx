import create from 'zustand';
import roles from '../../constants/roles.json';
import tags from '../../constants/tags.json';
import users from '../../constants/users.json';

type Roles = {
	[k: string]: { name: string; applied_tags_ids: number[] };
};

type TagFnArguments = (
	tag: any,
	role_id: string,
	state: any,
	tags: any
) => void;
interface IStore {
	users: { name: string; role_id: number }[];
	tags: { [k: string]: { title: string } };
	roles: Roles;
	selectedRole: number;
	selectedTag: string | null;
	addTagToRole: TagFnArguments;
	setSelectedRole: (id: number) => void;
	setSelectedTag: (id: string) => void;
	refreshTags: boolean;
	setRefreshTags: (arg: boolean) => void;
	removeTagFromRole: TagFnArguments;
}

const useStore = create<IStore>((set, get) => ({
	users: users.current_users,
	tags: tags,
	roles: roles,
	selectedRole: 1,
	selectedTag: null,
	addTagToRole: (tag, tag_id, currentRoles) => {
		let role = Object.keys(tag)[0];
		currentRoles[role].applied_tags_ids.push(Number(tag_id) + 1);
	},
	removeTagFromRole: (tag, tag_id, currentRoles) => {
		let role = Object.keys(tag)[0];
		let tempRoles = currentRoles[role].applied_tags_ids.filter(
			(tag: number) => tag !== Number(tag_id) + 1
		);
		currentRoles = tempRoles;
	},
	setSelectedRole: (id) => {
		return set({ selectedRole: id });
	},
	setSelectedTag: (id) => {
		return set({ selectedTag: id });
	},
	refreshTags: true,
	setRefreshTags: (bool) => {
		return set({ refreshTags: bool });
	},
}));

export default useStore;
