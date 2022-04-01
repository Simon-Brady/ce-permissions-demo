import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useStore } from '../../store';
import { FrequencyOptions } from '../FrequencyOptions';
import { Roles } from '../Roles';
const StyledTagWrapper = styled.div`
	&.permissions {
		height: 100px;
	}
	box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
	display: flex;
	height: 150px;
	flex-direction: column;
	margin-bottom: 10px;
	background-color: white;
	padding: 10px;
	.tools {
		display: flex;
		flex-direction: row;
		align-self: flex-end;
		color: #897c80;
		.delete {
			color: red;
			margin-left: 10px;
			cursor: pointer;
		}
	}
	.content {
		.title {
			font-size: 1.2em;
			font-weight: bold;
		}
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 20px;

		.freq {
			margin-top: 10px;
			text-transform: capitalize;
			.freq-update {
				cursor: pointer;
			}
		}
	}
	span.grippy {
		content: '....';
		width: 10px;
		height: 20px;
		display: inline-block;
		overflow: hidden;
		line-height: 5px;
		padding: 3px 4px;
		cursor: move;
		vertical-align: middle;
		margin-top: -0.7em;
		margin-right: 0.3em;
		font-size: 12px;
		font-family: sans-serif;
		letter-spacing: 2px;
		color: #cccccc;
		text-shadow: 1px 0 1px black;
	}
	span.grippy::after {
		content: '.. .. .. ..';
	}
`;

type TagProps = {
	key?: number;
	type: string;
	tag: {
		tagId: string;
		tagName: string;
		frequency?: { type: string; id: string }[];
	};
	deleteMethod?: (key: any, tagTitle: any) => void;
};

type TypedTags = {
	[k: string]: {
		title: string;
		frequency?: { id: string; type: string }[];
	};
};

const Tag = (tagProps: TagProps) => {
	const [isAddFrequencyOpen, setIsAddFrequency] = useState(false);

	const {
		selectedRole,
		rolesPermissions,
		refreshTags,
		setRefreshTags,
		tagsFrequency,
	} = useStore();

	const { type, tag, deleteMethod, key } = tagProps;
	const { tagId } = tag;

	type === 'tags' && console.log('tagProps', tagProps);

	const addFrequencyToRole = () => {};

	const toggleAddFrequencyOptionsVisibility = () => {
		setIsAddFrequency(!isAddFrequencyOpen);
	};

	const typedTags: TypedTags = tagsFrequency;

	const selectedFrequencies = () => {
		let availableTags = typedTags[tagId].frequency;
		let appliedPermissions = rolesPermissions[tagId]?.applied_tags.filter(
			(appliedTag) => appliedTag.id === tagId
		);
		if (appliedPermissions?.length) {
			console.log(`applied permissions for ${tag.tagName}:`);
			console.table(appliedPermissions);
			let arry = appliedPermissions.map((permission) => permission.id);
			type === 'tags' && console.log('arry', arry);
		}

		// type === 'tags' &&
		// 	console.log(
		// 		'roles',
		// 		'applied',
		// 		appliedPermissions,
		// 		'selected',
		// 		rolesPermissions[tagId]
		// 	);
		// console.log(
		// 	'avail',
		// 	availableTags
		// 	//  setPermissions
		// );
		if (tag.frequency) {
			// tag.frequency.map((freq) => console.log('freq', freq));
		}
	};

	return (
		<StyledTagWrapper key={key} className={type}>
			{type === 'tags' && <span className='grippy'></span>}
			<div className='tools'>
				{type === 'permissions' ? (
					<>
						<>{tag.frequency ? <span>Edit</span> : null}</>
						<span
							className='delete'
							onClick={() => {
								deleteMethod ? deleteMethod(tag.tagId, tag.tagName) : {};
							}}
						>
							X
						</span>
					</>
				) : null}
			</div>
			<div className='content'>
				<div className='title'>{tag.tagName}</div>
				<div className='freq'>
					{selectedFrequencies()}
					{tag.frequency && selectedFrequencies()}
					<>
						{tag.frequency ? (
							<p>
								<span
									className='freq-update'
									onClick={() => {
										toggleAddFrequencyOptionsVisibility();
									}}
								>
									Add Frequency +
								</span>
							</p>
						) : (
							''
						)}
						{isAddFrequencyOpen && tag.frequency ? (
							<FrequencyOptions
								appliedFrequencyArray={tag.frequency}
								availableFrequencies={typedTags[tagId].frequency}
							/>
						) : (
							''
						)}
					</>
				</div>
			</div>
		</StyledTagWrapper>
	);
};

export default Tag;
