import React from 'react';
import roles from '../../../constants/roles.json';
import { useStore } from '../../../src/store';
import styled from '@emotion/styled';
import {
	Group,
	Box,
	Collapse,
	ThemeIcon,
	Text,
	UnstyledButton,
	createStyles,
} from '@mantine/core';
import {
	Icon as TablerIcon,
	CalendarStats,
	ChevronLeft,
	ChevronRight,
} from 'tabler-icons-react';

const StyledRolesWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 40px;
	margin-left: 16px;
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

const useStyles = createStyles((theme) => ({
	control: {
		fontWeight: 500,
		display: 'block',
		width: '100%',
		padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
		fontSize: theme.fontSizes.sm,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[7]
					: theme.colors.gray[0],
			color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		},
	},

	link: {
		fontWeight: 500,
		display: 'block',
		textDecoration: 'none',
		padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
		paddingLeft: 31,
		marginLeft: 30,
		fontSize: theme.fontSizes.sm,
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		borderLeft: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[7]
					: theme.colors.gray[0],
			color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		},
	},

	chevron: {
		transition: 'transform 200ms ease',
	},
}));
interface LinksGroupProps {
	icon: TablerIcon;
	label: string;
	initiallyOpened?: boolean;
	links?: { label: string; link: string }[];
	link: string;
}

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
						<Group position='apart' spacing={0}>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<ThemeIcon variant='light' size={30}>
									{/* <Icon size={18} /> */}
								</ThemeIcon>
								<Box ml='md'> {val.name}</Box>
							</Box>
						</Group>
					</p>
				);
			})}
			{/* <button>Create Role Button</button> */}
		</StyledRolesWrapper>
	);
};

export default Roles;
