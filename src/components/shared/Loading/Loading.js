import React from 'react';

const Loading = ({ title }) => {
	return (
		<div className="flex flex-col items-center justify-center m-20">
			<div className="w-16 h-16 border-b-2 border-base-content rounded-full animate-spin"></div>
			{title && <p className="mt-10">{title}...</p>}
		</div>
	);
};

export default Loading;
