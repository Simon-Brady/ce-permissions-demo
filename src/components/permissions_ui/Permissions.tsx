import React, { useEffect } from 'react';
import roles from '../../../constants/roles.json';
import tags from '../../../constants/tags.json';
import { useStore } from '../../../src/store';
import styled from '@emotion/styled';

const StyledTagsWrapper = styled.div`
	.hidden {
		display: none;
	}
	.tag {
		padding: 20px;
		background: #06ba63;
		color: white;
		margin: 5px;
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
		<StyledTagsWrapper>
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
