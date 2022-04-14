import React, { useState } from 'react';
import {
	createStyles,
	Header,
	Container,
	Group,
	Burger,
	Button,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import Logo from '../../assets/CE-Logo-.svg';
import styled from '@emotion/styled';

const StyledHeader = styled(Header)`
	> div {
		max-width: 1920px;
	}
`;

const StyledSvgContainer = styled.div`
	max-width: 150px;
	svg: {
		width: 150px;
	}
`;

const useStyles = createStyles((theme) => ({
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '100%',
	},

	links: {
		[theme.fn.smallerThan('xs')]: {
			display: 'none',
		},
	},
	svgContainer: {
		maxWidth: '150px',
	},
	burger: {
		[theme.fn.largerThan('xs')]: {
			display: 'none',
		},
	},

	link: {
		display: 'block',
		lineHeight: 1,
		padding: '8px 12px',
		borderRadius: theme.radius.sm,
		textDecoration: 'none',
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},
	},

	linkActive: {
		'&, &:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
					: theme.colors[theme.primaryColor][0],
			color:
				theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
		},
	},
}));

// interface HeaderSimpleProps {
// 	links?: { link: string; label: string }[];
// }

const MantineHeader = () => {
	const [opened, toggleOpened] = useBooleanToggle(false);
	const { classes, cx } = useStyles();
	console.log('done');

	return (
		<StyledHeader height={60}>
			<Container className={classes.header}>
				<StyledSvgContainer>
					<Logo />
				</StyledSvgContainer>
				<Burger
					opened={opened}
					onClick={() => toggleOpened()}
					className={classes.burger}
					size='sm'
				/>
			</Container>
		</StyledHeader>
	);
};

export default MantineHeader;
