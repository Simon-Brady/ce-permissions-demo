import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Navbar } from './components/Navbar';
import styled from '@emotion/styled';
import { Users } from './components/users_ui';
import { Permissions } from './components/permissions_ui';
import { Roles } from './components/Roles';
import { Tags } from './components/Tags';
import { DragDropContext } from 'react-beautiful-dnd';
import { useStore } from './store';

const StyledWrapper = styled.div`
	h1 {
		font-size: 3em;
	}
	padding: 0 8px 12px;
	.permissions-tags {
		display: flex;
	}
	// div.container {
	// 	border-radius: 10px;
	// 	background: #ffffff;
	// 	box-shadow: inset 5px -5px 10px #f7f7f7, inset -5px 5px 10px #ffffff;
	// }
`;

const App = () => {
	const {
		setSelectedTag,
		selectedTag,
		addTagToRole,
		selectedRole,
		roles,
		tags,
		setRefreshTags,
	} = useStore();

	const onDragEnd = (result: any) => {
		const { source, destination } = result;
		if (!result.destination || source.droppableId === destination.droppableId)
			return;

		console.log(
			'drop',
			{ [selectedRole.toString()]: selectedTag },
			source.index.toString(),
			roles,
			tags
		);
		addTagToRole(
			{ [selectedRole.toString()]: selectedTag },
			source.index.toString(),
			roles,
			tags
		);
		setRefreshTags(true);
	};

	const onDragStart = (start: any) => {
		const { draggableId } = start;
		console.log('draggable ID', draggableId);
		setSelectedTag(draggableId);
	};

	return (
		<>
			<Navbar />
			<StyledWrapper>
				<h1>Permissions - Fellowship Inc.</h1>
				<div className='permissions-tags'>
					<Roles />
					<DragDropContext
						onDragEnd={(result) => onDragEnd(result)}
						onDragStart={(start) => onDragStart(start)}
					>
						<Permissions />
						<Tags />
					</DragDropContext>
				</div>
				<Users />
			</StyledWrapper>
		</>
	);
};

export default hot(App);
