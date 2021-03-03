import React from 'react';
import Loader from "../../components/shareds/Loader";
import {useSelector} from "react-redux";
import {selectLoading} from "../../features/forecasts/forecastSlice";
import Forecast from "../../features/forecasts/Forecast";

const Forecasts: React.FC = () => {
	const loading = useSelector(selectLoading);

	return (
		<>
			<Loader show={loading}/>
			<Forecast/>
		</>
	);
};

export default Forecasts;
