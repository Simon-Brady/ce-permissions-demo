import React from 'react';
import styled from '@emotion/styled';
import Logo from '../../../assets/CE-Logo-.svg';
const StyledNav = styled.nav`
	background: black;
	padding: 8px 12px;
`;
const Navbar = () => {
	return (
		<StyledNav>
			<Logo />
		</StyledNav>
	);
};

export default Navbar;
