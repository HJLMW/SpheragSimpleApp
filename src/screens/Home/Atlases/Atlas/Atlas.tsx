import { View, Text, SafeAreaView, ActivityIndicator, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StackParamProps } from "../../../Screens";
import styles from "./Styles";
import { Method, spheragApi } from "../../../../utils/api";
import { useEffect, useState } from "react";
import { AtlasStatus, Atlas as AtlasType, EneryMode } from "../../../../types/atlas";
import { AntennaSignal, BatteryEmpty, Box3dPoint, CheckCircle, Clock, EvPlug, Network } from "iconoir-react-native";
import { DigitalInputPlusStatus, FertilizerPlusModes, FertilizerPlusStatus, MixerPlusModes, MixerPlusStatus, PumpPlusModes, PumpPluStatus, ValvePlusModes, ValvePlusStatus } from "../../../../types/connectors";
import HeaderBar from "../../../../components/HeaderBar";
import MapLibreGL from '@maplibre/maplibre-react-native';

/**
 * Atlas component that displays detailed information about a specific atlas.
 * Retrieves and renders data based on the IMEI parameter passed in the route.
 */
export default function Atlas() {
	const route = useRoute<RouteProp<StackParamProps, "Atlas">>();
	const { name, imei } = route.params;

	const [atlas, setAtlas] = useState<AtlasType>();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Fetch atlas details using the IMEI
		spheragApi(`/Atlas/${imei}`, Method.GET)
			.then(result => {
				if (result) {
					setAtlas(result);
				}
				setIsLoading(false);
			});
	}, [imei]);

	/**
	 * Logic to handle desynchronization of latitude and longitude of the dev data mock from the API.
	 */
	let centerMapCoords: number[] = [ 0,0 ];

	if(atlas?.connectors) {
		if(atlas.connectors.input && atlas.connectors.input.length > 0) {
			if (atlas.connectors.input[0].latitude && atlas.connectors.input[0].longitude) {
				centerMapCoords = [
					parseFloat(atlas.connectors.input[0].longitude),
					parseFloat(atlas.connectors.input[0].latitude),
				]
			}
		} else if (atlas.connectors.output && atlas.connectors.output.length > 0) {
			if (atlas.connectors.output[0].latitude && atlas.connectors.output[0].longitude) {
				centerMapCoords = [
					parseFloat(atlas.connectors.output[0].longitude),
					parseFloat(atlas.connectors.output[0].latitude),
				]
			}
		} else if (atlas.connectors.sensor && atlas.connectors.sensor.length > 0) {
			if (atlas.connectors.sensor[0].latitude && atlas.connectors.sensor[0].longitude) {
				centerMapCoords = [
					parseFloat(atlas.connectors.sensor[0].longitude),
					parseFloat(atlas.connectors.sensor[0].latitude),
				]
			}
		}
	}

	/**
	 * Renders the appropriate view for a connector based on its type.
	 * @param connector - The connector object to be rendered.
	 * @returns JSX element representing the connector.
	 */
	const renderConnector = (connector: any) => {
		switch (connector.type) {
			case 4: // Flowmeter
				return (
					<View key={connector.connectorNumber} style={styles.connector}>
						<Text style={styles.connectorTitle}>{connector.name}</Text>
						<Text style={styles.connectorResult}>
							Acumulado/24h: {connector.flowmeter?.accumulated24 ? `${connector.flowmeter.accumulated24.value}${connector.flowmeter.accumulated24.symbol}` : 'N/A'}
						</Text>
					</View>
				);
			case 5: // Digital Input
				return (
					<View key={connector.connectorNumber} style={styles.connector}>
						<Text style={styles.connectorTitle}>{connector.name}</Text>
						<Text style={styles.connectorResult}>Estado: {connector.digitalInput?.status !== undefined ? DigitalInputPlusStatus[connector.digitalInput?.status] : 'N/A'}</Text>
					</View>
				);
			case 1: // Pump
				return (
					<View key={connector.connectorNumber} style={styles.connector}>
						<Text style={styles.connectorTitle}>{connector.name}</Text>
						<Text style={styles.connectorResult}>Modo: {connector.pump?.mode !== undefined ? PumpPlusModes[connector.pump?.mode] : 'N/A'}</Text>
						<Text style={styles.connectorResult}>Estado: {connector.pump?.status !== undefined ? PumpPluStatus[connector.pump?.status] : 'N/A'}</Text>
					</View>
				);
			case 0: // Valve
				return (
					<View key={connector.connectorNumber} style={styles.connector}>
						<Text style={styles.connectorTitle}>{connector.name}</Text>
						<Text style={styles.connectorResult}>Modo: {connector.valve?.mode !== undefined ? ValvePlusModes[connector.valve?.mode] : 'N/A'}</Text>
						<Text style={styles.connectorResult}>Estado: {connector.valve?.status !== undefined ? ValvePlusStatus[connector.valve?.status] : 'N/A'}</Text>
					</View>
				);
			case 2: // Fertilizer
				return (
					<View key={connector.connectorNumber} style={styles.connector}>
						<Text style={styles.connectorTitle}>{connector.name}</Text>
						<Text style={styles.connectorResult}>Modo: {connector.fertilizer?.mode !== undefined ? FertilizerPlusModes[connector.fertilizer?.mode] : 'N/A'}</Text>
						<Text style={styles.connectorResult}>Estado: {connector.fertilizer?.status !== undefined ? FertilizerPlusStatus[connector.fertilizer?.status] : 'N/A'}</Text>
					</View>
				);
			case 3: // Mixer
				return (
					<View key={connector.connectorNumber} style={styles.connector}>
						<Text style={styles.connectorTitle}>{connector.name}</Text>
						<Text style={styles.connectorResult}>Modo: {connector.mixer?.mode !== undefined ? MixerPlusModes[connector.mixer?.mode] : 'N/A'}</Text>
						<Text style={styles.connectorResult}>Estado: {connector.mixer?.status !== undefined ? MixerPlusStatus[connector.mixer?.status] : 'N/A'}</Text>
					</View>
				);
			case 6: // Sensor
				return (
					<View key={connector.connectorNumber} style={styles.connector}>
						<Text style={styles.connectorTitle}>{connector.name}</Text>
						<Text style={styles.connectorResult}>Valores: {connector.sensor?.values.map((v: any, index: number) => `${v.value}${v.unit}`).join(', ') || 'N/A'}</Text>
					</View>
				);
			default:
				return null;
		}
	};

	return (
		<SafeAreaView style={styles.root}>
			<HeaderBar title={name} canGoBack />
			{
				isLoading ?
					<View style={styles.loading}>
						<ActivityIndicator size="large" />
					</View>
					: atlas ?
						<ScrollView style={styles.container}>
							<Text style={styles.sectionTitle}>Detalles</Text>
							<View style={styles.section}>
								<View style={styles.row}>
									<View style={styles.column}>
										<View style={styles.rowChild}>
											<View style={styles.columnChild}>
												<Text>Estado:</Text>
												<Text style={styles.result}>{AtlasStatus[atlas.atlasStatus].toUpperCase()}</Text>
											</View>
											<Network height={30} width={30} color="#ddd" />
										</View>
									</View>
									<View style={styles.column}>
										<View style={styles.rowChild}>
											<View style={styles.columnChild}>
												<Text>IMEI:</Text>
												<Text style={styles.result}>{atlas.imei}</Text>
											</View>
											<CheckCircle height={30} width={30} color="#ddd" />
										</View>
									</View>
								</View>
								<View style={styles.row}>
									<View style={styles.column}>
										<View style={styles.rowChild}>
											<View style={styles.columnChild}>
												<Text>Batería:</Text>
												<Text style={styles.result}>{Math.trunc(atlas.batteryPercentage)}%</Text>
											</View>
											<BatteryEmpty height={30} width={30} color="#ddd" />
										</View>
									</View>
									<View style={styles.column}>
										<View style={styles.rowChild}>
											<View style={styles.columnChild}>
												<Text>Señal:</Text>
												<Text style={styles.result}>{Math.trunc(atlas.signalPercentage)}%</Text>
											</View>
											<AntennaSignal height={30} width={30} color="#ddd" />
										</View>
									</View>
								</View>
								<View style={styles.row}>
									<View style={styles.column}>
										<View style={styles.rowChild}>
											<View style={styles.columnChild}>
												<Text>Tipo de producto:</Text>
												<Text style={styles.result}>{atlas.productTypeName}</Text>
											</View>
											<Box3dPoint height={30} width={30} color="#ddd" />
										</View>
									</View>
									<View style={styles.column}>
										<View style={styles.rowChild}>
											<View style={styles.columnChild}>
												<Text>Fin de suscripción:</Text>
												<Text style={styles.result}>{new Date(atlas.expiredDate).toLocaleDateString()}</Text>
											</View>
											<Clock height={30} width={30} color="#ddd" />
										</View>
									</View>
								</View>
								<View style={styles.row}>
									<View style={styles.column}>
										<View style={styles.rowChild}>
											<View style={styles.columnChild}>
												<Text>Modo de energía:</Text>
												<Text style={styles.result}>{atlas.energyMode !== undefined && atlas.energyMode !== null ? EneryMode[atlas.energyMode].toUpperCase() : 'N/A'}</Text>
											</View>
											<EvPlug height={30} width={30} color="#ddd" />
										</View>
									</View>
								</View>
							</View>

							<MapLibreGL.MapView
								style={styles.mapView}
								logoEnabled={false}
								styleURL="https://demotiles.maplibre.org/style.json"
							>
								<MapLibreGL.Camera
									centerCoordinate={centerMapCoords}
									zoomLevel={16}
								/>
								
								{atlas?.connectors?.input && atlas.connectors.input.map(connector => (
									<MapLibreGL.PointAnnotation
										key={`input-${connector.id}`}
										id={`input-${connector.id}`}
										coordinate={[
											parseFloat(connector.longitude),
											parseFloat(connector.latitude),
										]}
									>
										<View style={styles.connectorPin}>
											<Text style={styles.connectorPinText}>{connector.name}</Text>
										</View>
									</MapLibreGL.PointAnnotation>
								))}

								{atlas?.connectors?.output && atlas.connectors.output.map(connector => (
									<MapLibreGL.PointAnnotation
										key={`output-${connector.id}`}
										id={`output-${connector.id}`}
										coordinate={[
											parseFloat(connector.longitude),
											parseFloat(connector.latitude),
										]}
									>
										<View style={styles.connectorPin}>
											<Text style={styles.connectorPinText}>{connector.name}</Text>	
										</View>
									</MapLibreGL.PointAnnotation>
								))}

								{atlas?.connectors?.sensor && atlas.connectors.sensor.map(connector => (
									<MapLibreGL.PointAnnotation
										key={`sensor-${connector.id}`}
										id={`sensor-${connector.id}`}
										coordinate={[
											parseFloat(connector.longitude),
											parseFloat(connector.latitude),
										]}
									>
										<View style={styles.connectorPin}>
											<Text style={styles.connectorPinText}>{connector.name}</Text>
										</View>
									</MapLibreGL.PointAnnotation>
								))}

							</MapLibreGL.MapView>

							{
								Object.keys(atlas.connectors).length > 0 ? <Text style={styles.connectorsTitle}>Contectores</Text> : null
							}

							<View style={styles.connectorSection}>
								{
									atlas.connectors && atlas.connectors.input ?
										<View style={styles.row}>
											<View style={styles.column}>
												<Text style={styles.subtitle}>Inputs</Text>
												{atlas.connectors.input.map(renderConnector)}
											</View>
										</View>
										: null
								}
								{
									atlas.connectors && atlas.connectors.output ?
										<View style={styles.row}>
											<View style={styles.column}>
												<Text style={styles.subtitle}>Outputs</Text>
												{atlas.connectors.output.map(renderConnector)}
											</View>
										</View>
										: null
								}
								{
									atlas.connectors && atlas.connectors.sensor ?
										<View style={styles.row}>
											<View style={styles.column}>
												<Text style={styles.subtitle}>Sensors</Text>
												{atlas.connectors.sensor.map(renderConnector)}
											</View>
										</View>
										: null
								}
							</View>
						</ScrollView>
						: null
			}
		</SafeAreaView>
	);
}