import React from 'react';
import styled from '@emotion/styled';
import Logo from '../../../assets/CE-Logo-.svg';
const StyledNav = styled.nav`
	background: #0f1a20;
	padding: 8px 12px;
	width: 100%;
`;
const Navbar = () => {
	return (
		<StyledNav>
			<Logo />
		</StyledNav>
	);
};

export default Navbar;
