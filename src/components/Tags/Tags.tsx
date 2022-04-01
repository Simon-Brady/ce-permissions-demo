import React, { MouseEventHandler, useState, useEffect } from 'react';
import tagsFrequency from '../../../constants/tags-frequency.json';
import styled from '@emotion/styled';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useStore } from '../../../src/store';
import { Tag } from '../Tag';
const StyledTagsWrapper = styled.div`
	background: #8bdbbc;
	text-align: center;
	display: flex;
	padding: 20px;
	border-radius: 6px;
`;

type Tags = {
	[k: string]: {
		title: string;
		frequency?: {
			type: string;
			id: string;
		}[];
	};
};
type DictionaryValue = {
	[k: string]: string;
};

const Permissions = () => {
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

	const typedTags: Tags = tagsFrequency;

	const retrieveDataAttribute = (args: { node: any; attribute: string }) => {
		return args.node.getAttribute(`data-${args.attribute}`);
	};

	const renderTags = () => {
		let tags = Object.entries(typedTags).map(([key, val], i) => {
			console.log('key', key, 'current tags', currentTags, 'val', val);
			return !currentTags.includes(key) ? (
				<Draggable draggableId={val.title} key={val.title} index={i}>
					{(provided, snapshot) => {
						return (
							<div
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								className='tag'
								key={i}
								data-title={val.title}
								data-index={key}
								onClick={handleClick}
							>
								<Tag
									type={'tags'}
									tag={{
										tagId: key.toString(),
										tagName: val.title,
										frequency: val.frequency,
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
