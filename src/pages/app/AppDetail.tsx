import React from 'react';
import {useLocation} from 'react-router-dom';
import ResultDetail from "../../features/resort-maps/results-mobile/ResultDetail";
import {useSelector} from "react-redux";
import {selectLoading} from "../../features/resort-maps/resortMapSlice";
import Loader from "../../components/shareds/Loader";

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const AppDetail: React.FC = () => {
	let query = useQuery();
	const loading = useSelector(selectLoading);

	return (
		<>
			<Loader show={loading}/>
			<ResultDetail resortId={query.get('resort')}/>
		</>
	);
};

export default AppDetail;
