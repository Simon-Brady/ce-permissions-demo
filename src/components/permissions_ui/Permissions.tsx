import React, { useEffect } from 'react';
import roles from '../../../constants/roles.json';
import tags from '../../../constants/tags.json';
import { useStore } from '../../../src/store';
import styled from '@emotion/styled';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const StyledTagsWrapper = styled.div`
	.hidden {
		display: none;
	}
	padding: 20px;
	background: #f5f5f5;
	text-align: center;
	.tag {
		padding: 30px 60px;
		color: #06ba63;
		margin: 5px;
		text-align: center;
		border-radius: 16px;
		background: #ffffff;
		box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
	}
`;

type Tags = {
	[k: string]: {
		title: string;
	};
};

const Permissions = () => {
	const typedTags: Tags = tags;
	const { selectedRole } = useStore();
	useEffect(() => {
		console.log(selectedRole, 'useEffect');
	}, [selectedRole]);

	return (
		<StyledTagsWrapper className='container'>
			<b>Selected</b>
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
								let tagNameNames = val.applied_tags_ids.map((id, y) => (
									<Draggable
										draggableId={typedTags[id].title}
										key={typedTags[id].title}
										index={i}
									>
										{(provided, snapshot) => {
											console.log('provided', provided);
											return (
												<div
													className='tag'
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													{typedTags[id].title}
												</div>
											);
										}}
									</Draggable>
								));

								return (
									<>
										<p
											key={i}
											className={selectedRole === i + 1 ? `selected` : `hidden`}
										>
											{val.name}
											<div>{tagNameNames}</div>
										</p>
									</>
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
