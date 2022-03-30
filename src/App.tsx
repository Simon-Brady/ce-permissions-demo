import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Navbar } from './components/Navbar';
import styled from '@emotion/styled';
import { Users } from './components/users_ui';
import { Permissions } from './components/permissions_ui';
import { Roles } from './components/Roles';
import { Tags } from './components/Tags';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const StyledWrapper = styled.div`
	padding: 0 8px 12px;
	.permissions-tags {
		display: flex;
	}
	div:first-of-type:not(.tag) {
		margin-right: 20px;
	}
	div.container {
		border-radius: 10px;
		background: #ffffff;
		box-shadow: inset 5px -5px 10px #f7f7f7, inset -5px 5px 10px #ffffff;
	}
`;

const App = () => {
	const onDragEnd = (result: any) => {
		console.log(result);
	};
	return (
		<>
			<Navbar />
			<StyledWrapper>
				<h1>Permissions</h1>
				<div className='permissions-tags'>
					<DragDropContext onDragEnd={(result) => onDragEnd(result)}>
						<Permissions />
						<Tags />
					</DragDropContext>
				</div>
				<Roles />
				<Users />
			</StyledWrapper>
		</>
	);
};

export default hot(App);
