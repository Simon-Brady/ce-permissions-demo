import React from 'react';
import styled from '@emotion/styled';
import { useStore } from '../../store';
const StyledTagWrapper = styled.div`
	display: flex;
	height: 150px;
	flex-direction: column;
	box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
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
`;

type TagProps = {
	type: string;
	tag: {
		tagId: string;
		tagName: string;
		frequency?: { type: string; selected: boolean }[];
	};
	deleteMethod?: () => void;
};

const Tag = (tagProps: TagProps) => {
	const { selectedRole, roles, refreshTags, setRefreshTags } = useStore();

	const { type, tag, deleteMethod } = tagProps;

	return (
		<StyledTagWrapper>
			<div className='tools'>
				{type === 'permissions' ? (
					<>
						<>{tag.frequency ? <span>Edit</span> : null}</>
						<span className='delete' onClick={() => {}}>
							X
						</span>
					</>
				) : null}
			</div>
			<div className='content'>
				<div className='title'>{tag.tagName}</div>
				<div className='freq'>
					{tag.frequency
						? tag.frequency.map((el) =>
								el.selected ? (
									<span className='freq-value'>{el.type}</span>
								) : null
						  )
						: null}
					<>
						{tag.frequency ? (
							<p>
								<span className='freq-update' onClick={() => {}}>
									Add Frequency +
								</span>
							</p>
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
