import React from 'react';
import {useLocation} from 'react-router-dom';
import ResultDetail from "../../features/resort-maps/results-mobile/ResultDetail";

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
}

const AppDetail: React.FC = () => {
	let query = useQuery();

	return (
		<ResultDetail resortId={query.get('resort')}/>
	);
};

export default AppDetail;
