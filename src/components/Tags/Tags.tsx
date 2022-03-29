import React, { MouseEventHandler } from 'react';
import tags from '../../../constants/tags.json';
import styled from '@emotion/styled';

const StyledTagsWrapper = styled.div`
	.tag {
		padding: 20px;
		background: #06ba63;
		color: white;
		margin: 5px;
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
				console.log(datum);
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
		<StyledTagsWrapper>
			<h3>Tags Container</h3>

			{Object.entries(tags).map(([key, val], i) => {
				return (
					<div
						className='tag'
						key={i}
						data-title={val.title}
						data-index={key}
						onClick={handleClick}
					>
						{val.title}
					</div>
				);
			})}
			<button>Create Tag Group</button>
		</StyledTagsWrapper>
	);
};

export default Permissions;
