import React from 'react';
import ResortMap from '../../features/resort-maps/ResortMap';
import Loader from "../../components/shareds/Loader";
import {useSelector} from "react-redux";
import {selectLoading} from "../../features/resort-maps/resortMapSlice";
import {useLocation} from "react-router-dom";

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const App: React.FC = () => {
	let query = useQuery();
	const loading = useSelector(selectLoading);

	return (
		<>
			<Loader show={loading}/>
			<ResortMap resortId={query.get('resort')}/>
		</>
	);
};

export default App;
