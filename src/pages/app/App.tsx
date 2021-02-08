import React from 'react';
import ResortMap from '../../features/resort-maps/ResortMap';
import Loader from "../../components/shareds/Loader";
import {useSelector} from "react-redux";
import {selectLoading} from "../../features/resort-maps/resortMapSlice";

const App: React.FC = () => {
	const loading = useSelector(selectLoading);

	return (
		<>
			<Loader show={loading}/>
			<ResortMap/>
		</>
	);
};

export default App;
