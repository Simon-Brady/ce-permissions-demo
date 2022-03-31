import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useStore } from '../../store';
import { FrequencyOptions } from '../FrequencyOptions';
const StyledTagWrapper = styled.div`
	display: flex;
	height: 150px;
	flex-direction: column;
	box-shadow: 10px 10px 30px #d9d9d9, -20px -20px 60px #ffffff;
	margin-bottom: 10px;
	color: #06ba63;
	border-radius: 16px;
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
		frequency?: { type: string; selected: boolean }[];
	};
	deleteMethod?: (key: any, tagTitle: any) => void;
};

const Tag = (tagProps: TagProps) => {
	const [isAddFrequencyOpen, setIsAddFrequency] = useState(false);

	const { selectedRole, roles, refreshTags, setRefreshTags } = useStore();

	const { type, tag, deleteMethod, key } = tagProps;

	const addFrequencyToRole = () => {};

	const toggleAddFrequencyOptionsVisibility = () => {
		setIsAddFrequency(!isAddFrequencyOpen);
	};

	return (
		<StyledTagWrapper key={key}>
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
					{tag.frequency &&
						tag.frequency.map(
							(el) =>
								el.selected && <span className='freq-value'>{el.type}</span>
						)}
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
						{isAddFrequencyOpen && tag.frequency ? <FrequencyOptions /> : ''}
					</>
				</div>
			</div>
		</StyledTagWrapper>
	);
};

export default Tag;
