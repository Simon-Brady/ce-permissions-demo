import React from 'react';
import { Navbar, ScrollArea, createStyles } from '@mantine/core';
import UserButton from './UserButton/UserButton';
import { Roles } from '../../components/Roles';

const useStyles = createStyles((theme) => ({
	navbar: {
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
		paddingBottom: 0,
	},

	header: {
		padding: theme.spacing.md,
		paddingTop: 0,
		marginLeft: -theme.spacing.md,
		marginRight: -theme.spacing.md,
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		borderBottom: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
	},

	links: {
		marginLeft: -theme.spacing.md,
		marginRight: -theme.spacing.md,
	},

	linksInner: {
		paddingTop: theme.spacing.xl,
		paddingBottom: theme.spacing.xl,
	},

	footer: {
		marginLeft: -theme.spacing.md,
		marginRight: -theme.spacing.md,
		borderTop: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
	},
}));

const MantineSidebar = () => {
	const { classes } = useStyles();
	return (
		<Navbar height={800} width={{ sm: 300 }} p='md' className={classes.navbar}>
			<Navbar.Section grow className={classes.links} component={ScrollArea}>
				<Roles />
			</Navbar.Section>

			<Navbar.Section className={classes.footer}>
				<UserButton
					image='https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80'
					name='Consumer Edge Customer'
					email='sbrady@consumer-edge.com'
				/>
			</Navbar.Section>
		</Navbar>
	);
};

export default MantineSidebar;
