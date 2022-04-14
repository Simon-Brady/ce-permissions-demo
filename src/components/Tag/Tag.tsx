import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useStore } from '../../store';
import tags from '../../../constants/tags.json';
import { FrequencyOptions } from '../FrequencyOptions';
import { Roles } from '../Roles';
const StyledTagWrapper = styled.div`
	box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
	display: flex;
	min-height: 70px;
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
			text-align: left;
			width: 100%;
			border-bottom: 1px solid grey;
		}
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-top: 10px;

		.subtags:not(:empty) {
			margin-top: 10px;
			margin-bottom: 10px;
			text-transform: capitalize;
			.subtags-group {
				display: flex;
				flex-wrap: wrap;
				.subtag {
					background: lightgrey;
					border-radius: 6px;
					padding: 5px;
					margin: 5px 5px 0 0;
					&.delay {
						background: orange;
					}
				}
			}
		}
	}
	span.grippy {
		align-self: flex-end;
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
		subTagIds?: string[];
	};
	deleteMethod?: (key: any, tagTitle: any) => void;
};

type TypedTags = {
	[k: string]: {
		title: string;
	};
};

const Tag = (tagProps: TagProps) => {
	let typedJsonTags: TypedTags = tags;

	const { type, tag, deleteMethod, key } = tagProps;

	const { subTagIds } = tag;

	const renderSubTags = () => {
		if (subTagIds) {
			return (
				<div className='subtags-group'>
					{subTagIds.map((tag) => (
						<span
							className={`subtag ${
								typedJsonTags[tag].title.includes('Delay') ? 'delay' : 'tag'
							}`}
						>
							{typedJsonTags[tag].title}
						</span>
					))}
				</div>
			);
		} else {
			return null;
		}
	};
	return (
		<StyledTagWrapper key={key} className={type}>
			{type === 'tags' && <span className='grippy'></span>}
			<div className='tools'>
				{type === 'permissions' ? (
					<>
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
				<div className='subtags'>{renderSubTags()}</div>{' '}
			</div>
		</StyledTagWrapper>
	);
};

export default Tag;
