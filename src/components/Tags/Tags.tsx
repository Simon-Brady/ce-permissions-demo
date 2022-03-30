import React, { MouseEventHandler } from 'react';
import tags from '../../../constants/tags.json';
import styled from '@emotion/styled';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const StyledTagsWrapper = styled.div`
	background: #f5f5f5;
	text-align: center;
	padding: 20px;
	.tag {
		padding: 30px 60px;
		color: #06ba63;
		margin: 5px;
		text-align: center;
		border-radius: 16px;
		background: #ffffff;
		box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
		span {
			width: 50px;
		}
	}
`;
type DictionaryValue = {
	[k: string]: string;
};

const Permissions = () => {
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
							{Object.entries(tags).map(([key, val], i) => {
								return (
									<Draggable draggableId={val.title} key={val.title} index={i}>
										{(provided, snapshot) => {
											console.log('provided', provided);
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
													<span>{val.title}</span>
												</div>
											);
										}}
									</Draggable>
								);
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
