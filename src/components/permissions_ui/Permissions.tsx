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
			{Object.entries(roles).map(([key, val], i) => {
				let tagNameNames = val.applied_tags_ids.map((id, y) => (
					<div className='tag'>{typedTags[id].title}</div>
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
		</StyledTagsWrapper>
	);
};

export default Permissions;
