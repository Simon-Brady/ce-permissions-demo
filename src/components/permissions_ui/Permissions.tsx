import React, { useEffect } from 'react';
import roles from '../../../constants/roles.json';
import tags from '../../../constants/tagGroups.json';
import tagNames from '../../../constants/tags.json';

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
	tags: {
		id: number;
		customName: boolean | string;
		tags: {
			parentTagId: string;
			subTagIds?: string[];
		};
	}[];
};

type TagNames = {
	[k: string]: {
		title: string;
	};
};

const Permissions = () => {
	const typedTags: Tags = tags;
	const typedTagNames: TagNames = tagNames;

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
			<h3>Role Permissions</h3>
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
							{Object.entries(roles).map(([key, val], i) => {
								let tagNameNames = val.applied_tags_ids.map((id, y) => {
									let tagObject = typedTags.tags.filter(
										(tag) => tag.id === id
									)[0];
									return (
										<Tag
											type={'permissions'}
											tag={{
												tagId: tagObject.tags.parentTagId,
												tagName:
													typedTagNames[tagObject.tags.parentTagId].title,
												subTagIds: tagObject.tags.subTagIds,
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
