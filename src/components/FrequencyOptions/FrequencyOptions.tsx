import React from 'react';
import { Checkbox } from '../checkbox';

const FrequencyOptions = (frequencyOptions: any) => {
	console.log('optopm', frequencyOptions);
	// frequencyOptions.map((el) => console.log(el));
	const renderCheckboxes = () => {
		let checkboxes = frequencyOptions.appliedFrequencyArray.map((freq: any) =>
			console.log(freq)
		);
	};
	return <>{'test'}</>;
};

export default FrequencyOptions;
