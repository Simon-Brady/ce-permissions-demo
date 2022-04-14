import React, { MouseEventHandler, useState, useEffect } from 'react';
import tagGroups from '../../../constants/tagGroups.json';
import styled from '@emotion/styled';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useStore } from '../../../src/store';
import { Tag } from '../Tag';
import tagsJson from '../../../constants/tags.json';

const StyledTagsWrapper = styled.div`
	background: #8bdbbc;
	text-align: center;
	display: flex;
	padding: 20px;
	border-radius: 6px;
`;

type TypedTagsJson = {
	[k: string]: {
		title: string;
	};
};
type DictionaryValue = {
	[k: string]: string;
};

const Permissions = () => {
	let typedTagsJson: TypedTagsJson = tagsJson;
	const { selectedRole, rolesPermissions, refreshTags, setRefreshTags } =
		useStore();
	const [currentTags, setCurrentTags] = useState(
		rolesPermissions[selectedRole.toString()].applied_tags.map((tag) => tag.id)
	);

	useEffect(() => {
		if (refreshTags) {
			setRefreshTags(!refreshTags);
			setCurrentTags(
				rolesPermissions[selectedRole.toString()].applied_tags.map(
					(tag) => tag.id
				)
			);
		}
	}, [selectedRole, rolesPermissions, refreshTags]);

	const handleClick: MouseEventHandler = (e) => {
		let dataObject: DictionaryValue = {},
			dataValues = ['title', 'index'];
		if (e.currentTarget) {
			dataValues.forEach((datum) => {
				return (dataObject[datum] = retrieveDataAttribute({
					node: e.currentTarget,
					attribute: datum,
				}));
			});
		}
	};

	const retrieveDataAttribute = (args: { node: any; attribute: string }) => {
		return args.node.getAttribute(`data-${args.attribute}`);
	};

	const renderTags = () => {
		let tags = tagGroups.tags.map((tag) => {
			let id = tag.id.toString();
			let tagName =
				tag.customName && typeof tag.customName === 'string'
					? tag.customName
					: typedTagsJson[tag.tags.parentTagId].title;

			return !currentTags.includes(id) ? (
				<Draggable draggableId={id} key={id} index={Number(id)}>
					{(provided, snapshot) => {
						return (
							<div
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								className='tag'
								key={Number(id)}
								data-title={tag.id}
								data-index={Number(id)}
								onClick={handleClick}
							>
								<Tag
									type={'tags'}
									tag={{
										tagId: id,
										tagName: tagName,
										subTagIds: tag.tags.subTagIds,
									}}
								/>
							</div>
						);
					}}
				</Draggable>
			) : null;
		});
		return !tags.every((tag) => tag === null)
			? tags
			: 'All available tags have been applied';
	};

	return (
		<StyledTagsWrapper className='container'>
			<Droppable droppableId='tags' key='tags'>
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
							<h3>Available Tags</h3>
							{renderTags()}
							{provided.placeholder}
						</div>
					);
				}}
			</Droppable>
			{/* <button>Create Tag Group</button> */}
		</StyledTagsWrapper>
	);
};

export default Permissions;
