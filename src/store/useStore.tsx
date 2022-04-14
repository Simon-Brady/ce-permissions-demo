import create from 'zustand';
import roles from '../../constants/roles.json';
import tags from '../../constants/tags.json';
import users from '../../constants/users.json';
import roles_permissions from '../../constants/roles-permissions.json';
import tags_frequency from '../../constants/tags-frequency.json';

type Roles = {
	[k: string]: { name: string; applied_tags_ids: number[] };
};

type AppliedTag = {
	id: string;
	frequency?: string[];
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
	rolesPermissions: {
		[k: string]: {
			name: string;
			applied_tags: AppliedTag[];
		};
	};
	// tagsFrequency: {
	// 	[k: string]: {
	// 		title: string;
	// 		frequency?: { id: string; type: string }[];
	// 	};
	// };
	// changeTagFrequency: (
	// 	roleId: string,
	// 	tagId: string,
	// 	frequencyId: string,
	// 	action: 'add' | 'remove',
	// 	currentPermissions: any
	// ) => void;
}

const useStore = create<IStore>((set, get) => ({
	users: users.current_users,
	tags: tags,
	roles: roles,
	selectedRole: 1,
	selectedTag: null,
	rolesPermissions: roles_permissions,
	// tagsFrequency: tags_frequency,
	// changeTagFrequency: (roleId, tagId, frequencyId, action, currentRoles) => {
	// 	let currentRole = currentRoles[roleId];
	// 	const { applied_tags } = currentRole;
	// 	const { id, frequency } = applied_tags;

	// 	const tagToChange = applied_tags.filter(
	// 		(appliedTag: AppliedTag) => appliedTag.id === tagId
	// 	)[0];
	// 	const tagToChangeFrequency = tagToChange.frequency;

	// 	if (action === 'remove') {
	// 		let tempFrequeny = tagToChangeFrequency.filter(
	// 			(freq: any) => freq === tagId
	// 		);
	// 		console.log(tempFrequeny);
	// 	} else if (action === 'add') {
	// 		console.log('add');
	// 	}
	// },
	addTagToRole: (tag, tagId, currentRoles) => {
		console.log('method', currentRoles);
		let role = Object.keys(tag)[0];
		currentRoles[role].applied_tags_ids.push(Number(tagId));
	},
	removeTagFromRole: (tag, tagId, currentRoles) => {
		let role = Object.keys(tag)[0];
		let tempRoles = currentRoles[role].applied_tags_ids.filter(
			(tag: number) => tag !== Number(tagId)
		);
		currentRoles[role].applied_tags_ids = tempRoles;
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
