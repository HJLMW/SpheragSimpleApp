import React from 'react';
import AppScreens from './src/screens/Screens';
import MapLibreGL from '@maplibre/maplibre-react-native';

// Will be null for most users (only Mapbox authenticates this way).
// Required on Android just for test mode.
MapLibreGL.setAccessToken(null);

function App(): React.JSX.Element {

	return (
		<AppScreens />
	);
}

export default App;
