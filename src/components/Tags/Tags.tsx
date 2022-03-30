import React, { MouseEventHandler, useState, useEffect } from 'react';
import tags from '../../../constants/tags.json';
import styled from '@emotion/styled';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useStore } from '../../../src/store';
import { Tag } from '../Tag';
const StyledTagsWrapper = styled.div`
	background: #f5f5f5;
	text-align: center;
	display: flex;
	padding: 20px;
`;

type Tags = {
	[k: string]: {
		title: string;
		frequency?: {
			type: string;
			selected: boolean;
		}[];
	};
};
type DictionaryValue = {
	[k: string]: string;
};

const Permissions = () => {
	const { selectedRole, roles, refreshTags, setRefreshTags } = useStore();
	const [currentTags, setCurrentTags] = useState(
		roles[selectedRole.toString()].applied_tags_ids.toString()
	);

	useEffect(() => {
		if (refreshTags) {
			setRefreshTags(!refreshTags);
			setCurrentTags(
				roles[selectedRole.toString()].applied_tags_ids.toString()
			);
		}
	}, [selectedRole, roles, refreshTags]);

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

	const typedTags: Tags = tags;

	const retrieveDataAttribute = (args: { node: any; attribute: string }) => {
		return args.node.getAttribute(`data-${args.attribute}`);
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
							<h3>Tags Container</h3>
							{Object.entries(typedTags).map(([key, val], i) => {
								return !currentTags.includes(key) ? (
									<Draggable draggableId={val.title} key={val.title} index={i}>
										{(provided, snapshot) => {
											console.log(val.frequency);
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
							})}
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
