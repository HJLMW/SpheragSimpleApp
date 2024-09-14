import { View, Text, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import styles from "./Styles";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackParamProps } from "../../Screens";
import { Atlas, AtlasStatus, AtlasStatusColor, AtlasType } from "../../../types/atlas";
import { AntennaSignal, Battery25, Battery50, Battery75, BatteryEmpty, BatteryFull, ClockRotateRight, InfoCircle } from "iconoir-react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Method, spheragApi } from "../../../utils/api";
import HeaderBar from "../../../components/HeaderBar";
import SearchBar from "../../../components/SearchBar";

/**
 * Atlases component that displays a list of atlases for a specific system.
 * Manages data fetching, pagination, and navigation to details of a selected atlas.
 */
export default function Atlases() {

	const navigation = useNavigation<NavigationProp<StackParamProps>>(); // Hook to access navigation functions
	const route = useRoute<RouteProp<StackParamProps, "Atlases">>(); // Hook to access route parameters

	const { systemId, name } = route.params; // Extract systemId and name from route parameters

	const [atlases, setAtlases] = useState<Atlas[]>([]); // State to manage the list of atlases
	const [isLoading, setIsLoading] = useState(true); // State to manage loading status

	const [page, setPage] = useState(1); // State to track the current page for pagination
	const [loadingNewSystems, setLoadingNewSystems] = useState(false); // State to track if new atlases are being loaded
	const [didEndSearching, setDidEndSearching] = useState(false); // State to track if the end of data has been reached
	const [textToSearch, setTextToSearch] = useState(""); // State to manage the Search bar

	useEffect(() => {
		// Fetch the initial list of atlases for the given system
		spheragApi(`/Atlas/BySystem/${systemId}?Init=1&Limit=10`, Method.GET)
			.then(result => {
				if (result) {
					setAtlases(result.records); // Update state with fetched atlases
				}

				setIsLoading(false); // Update loading state
			});
	}, [systemId]); // Dependency on systemId to refetch data if systemId changes

	/**
	 * Handles the event when the user reaches the end of the list.
	 * Fetches more atlases if new atlases are being loaded and search has not ended.
	 */
	const handleEndReached = () => {
		if (!loadingNewSystems && !didEndSearching) {
			setLoadingNewSystems(true);

			spheragApi(`/Atlas/BySystem/${systemId}?Init=${page + 1}&Total=true&Limit=10`, Method.GET)
				.then(result => {
					if (result) {
						setAtlases(prevAtlases => [...prevAtlases, ...result.records]); // Append new atlases to the existing list
					} else {
						setDidEndSearching(true); // Mark that there are no more atlases to fetch
					}

					setPage(page => page + 1); // Increment page number
					setLoadingNewSystems(false); // Update loading state
				});
		}
	}

	/**
	 * Handles navigation to the Atlas details screen with the selected atlas's details.
	 * @param imei - IMEI of the selected atlas
	 * @param name - Name of the selected atlas
	 */
	const handleNavigation = (imei: string, name: string): void => {
		navigation.navigate("Atlas", {
			imei: imei,
			name: name
		});
	}

	/**
	 * Handles updating the search text for the Atlases search bar.
	 * This function is called whenever the user types in the search bar.
	 * 
	 * @param value - The current text entered in the search bar.
	 */
	const handleTextToSearch = (value: string) => {
		setTextToSearch(value);
	}

	/**
	 * Filters the list of Atlases based on the current search text.
	 *
	 * This memoized function returns a filtered array of Atlases where the Atlas's name
	 * includes the `textToSearch` value. The `useMemo` hook ensures that the filtering
	 * logic is only re-executed when either the `textToSearch` or `atlases` changes,
	 * optimizing performance by avoiding unnecessary recalculations.
	 *
	 * @returns {Array} - A filtered array of Atlases whose names include the search text.
	 *
	 * Dependencies:
	 * - `textToSearch`: The current value of the search bar (input text).
	 * - `atlases`: Needed to render eacj time an Atlas changes its state or new data is fetch.
	 */
	const atlasesFilter = useMemo(() => atlases.filter(atlas => atlas.name.includes(textToSearch)), [textToSearch, atlases]);

	return (
		<SafeAreaView style={styles.root}>
			<HeaderBar title={name} canGoBack />
			{
				isLoading ?
					< View style={styles.loading}>
						<ActivityIndicator size="large" />
					</View>
					: atlases.length > 0 ?
					<View style={styles.root}>
						<SearchBar
							placeholder="Buscar un atlas..."
							value={textToSearch}
							onChangeText={(value: string) => handleTextToSearch(value)}
						/>
						< FlatList style={styles.root}
							data={atlasesFilter}
							renderItem={({ item, index }) => <AtlasItem item={item} key={item.imei} handleNavigation={handleNavigation} />
							}
							onEndReached={handleEndReached}
							ListFooterComponent={
								loadingNewSystems ? <ActivityIndicator size="large" /> : null
							}
						/>
					</View>
						:
						<SafeAreaView style={styles.center}>
							<InfoCircle width={50} height={50} color="black" />
							<Text style={styles.emptyText}>No hay resultados</Text>
						</SafeAreaView>
			}
		</SafeAreaView >
	)
}

/**
 * AtlasItem component that displays individual atlas details.
 * Handles user interaction for navigating to the atlas details.
 * 
 * @param item - The atlas object to be displayed
 * @param handleNavigation - Function to handle navigation to the atlas's details
 */
interface AtlasItemProps {
	item: Atlas,
	handleNavigation: (imei: string, name: string) => void,
}

const AtlasItem = React.memo(({ item, handleNavigation }: AtlasItemProps) => {

	/**
	 * Determines the battery icon to be displayed based on the battery percentage.
	 * @returns The appropriate battery icon component based on the battery percentage
	 */
	const showBattery = (): React.JSX.Element => {
		let batteryComponent = null;

		if (item.batteryPercentage === 0) {
			batteryComponent = <BatteryEmpty height={20} width={20} color="black" />
		} else if (item.batteryPercentage <= 25) {
			batteryComponent = <Battery25 height={20} width={20} color="black" />
		} else if (item.batteryPercentage <= 50) {
			batteryComponent = <Battery50 height={20} width={20} color="black" />
		} else if (item.batteryPercentage <= 75) {
			batteryComponent = <Battery75 height={20} width={20} color="black" />
		} else {
			batteryComponent = <BatteryFull height={20} width={20} color="black" />
		}

		return batteryComponent;
	}

	return (
		<TouchableOpacity style={styles.item} onPress={() => handleNavigation(item.imei, item.name)}>
			<View style={styles.flexView}>
				<Text style={styles.itemName}>{item.name}</Text>
				<Text style={styles.imei}>{item.imei}</Text>
			</View>
			<View style={styles.flexView}>
				<View style={{ opacity: 0.3, borderRadius: 100, width: 10, height: 10, backgroundColor: AtlasStatusColor[item.atlasStatus], marginRight: 5 }} />
				{item.atlasStatus && <Text style={{ flex: 1, opacity: 0.5, fontWeight: "bold" }}>{AtlasStatus[item.atlasStatus].toUpperCase()}</Text>}
				<View style={styles.flexView}>
					<Text style={styles.batteryText}>{Math.trunc(item.batteryPercentage)}%</Text>
					<View style={styles.batteryIcon}>{showBattery()}</View>
				</View>
			</View>
			<View style={styles.flexView}>
				<View style={styles.flexRow}>
					<ClockRotateRight style={styles.clockIcon} height={15} width={15} color="black" />
					<Text style={styles.expiredDate}>Expira: {new Date(item.expiredDate).toLocaleDateString()}</Text>
				</View>
				<Text style={styles.signalText}>{item.signalPercentage}%</Text>
				<AntennaSignal style={styles.signalIcon} height={20} width={20} color="black" />
			</View>
			<Text style={styles.typeText}>{AtlasType[item.type]}</Text>
		</TouchableOpacity>
	)
}, () => true);