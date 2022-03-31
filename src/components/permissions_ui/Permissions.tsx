import React, { useEffect } from 'react';
import roles from '../../../constants/roles.json';
import tags from '../../../constants/tags.json';
import { useStore } from '../../../src/store';
import styled from '@emotion/styled';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Tag } from '../Tag';
const StyledTagsWrapper = styled.div`
	.hidden {
		display: none;
	}
	padding: 20px;
	background: #f5f5f5;
	text-align: center;
	margin-right: 20px;
`;

type Tags = {
	[k: string]: {
		title: string;
	};
};

const Permissions = () => {
	const typedTags: Tags = tags;
	const { selectedRole, removeTagFromRole, setRefreshTags, roles } = useStore();

	const removePermission = (key: number, tagTitle: string) => {
		removeTagFromRole(
			{ [selectedRole.toString()]: tagTitle },
			key.toString(),
			roles,
			tags
		);
		setRefreshTags(true);
	};

	return (
		<StyledTagsWrapper className='container'>
			<Droppable droppableId='permissions' key='permissions'>
				{(provided, snapshot) => {
					return (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							style={{
								// background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
								padding: 4,
								width: 250,
								minHeight: 500,
							}}
						>
							<h3>Role Permissions</h3>
							{Object.entries(roles).map(([key, val], i) => {
								let tagNameNames = val.applied_tags_ids.map((id, y) => {
									return (
										<Tag
											type={'permissions'}
											tag={{
												tagId: id.toString(),
												tagName: typedTags[id].title,
											}}
											deleteMethod={removePermission}
										/>
									);
								});

								return (
									<div
										key={i}
										className={selectedRole === i + 1 ? `selected` : `hidden`}
									>
										<div>{tagNameNames}</div>
									</div>
								);
							})}
							{provided.placeholder}
						</div>
					);
				}}
			</Droppable>
		</StyledTagsWrapper>
	);
};

export default Permissions;
