import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import styles from "./Styles";
import React, { useEffect, useMemo, useState } from "react";
import { Method, spheragApi } from "../../../utils/api";
import { saveSystems, addSystems, likeSystem } from "../../../states/systemSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/reduxHookTypes";
import { System } from "../../../types/system";
import { Heart, HeartSolid, Clock } from 'iconoir-react-native'
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParamProps } from "../../Screens";
import SearchBar from "../../../components/SearchBar";

/**
 * Systems component that displays a list of systems (farms).
 * Manages data fetching, pagination, and navigation to details of a selected system.
 */
export default function Systems() {
	const dispatch = useAppDispatch(); // Hook to dispatch actions to Redux store
	const systems = useAppSelector((state) => state.systems); // Hook to get systems data from Redux store

	const navigation = useNavigation<NavigationProp<StackParamProps>>(); // Hook to access navigation functions
	const [isLoading, setIsLoading] = useState(true); // State to manage loading status
	const [page, setPage] = useState(1); // State to track the current page for pagination
	const [loadingNewSystems, setLoadingNewSystems] = useState(false); // State to track if new systems are being loaded
	const [didEndSearching, setDidEndSearching] = useState(false); // State to track if the end of data has been reached
	const [textToSearch, setTextToSearch] = useState(""); // State to manage the Search bar

	useEffect(() => {
		// Fetch the initial list of systems
		spheragApi(`/System/List?Init=1&Total=true&Limit=10`, Method.GET)
			.then(result => {
				if (result) {
					dispatch(saveSystems(result.records)); // Save fetched systems to Redux store
				}

				setIsLoading(false); // Update loading state
			});
	}, []);

	/**
	 * Handles the event when the user reaches the end of the list.
	 * Fetches more systems if new systems are being loaded and search has not ended.
	 */
	const handleEndReached = () => {
		if (!loadingNewSystems && !didEndSearching) {
			setLoadingNewSystems(true);

			spheragApi(`/System/List?Init=${page + 1}&Total=true&Limit=10`, Method.GET)
				.then(result => {
					if (result) {
						dispatch(addSystems(result.records)); // Add more systems to Redux store
					} else {
						setDidEndSearching(true); // Mark that there are no more systems to fetch
					}

					setPage(page => page + 1); // Increment page number
					setLoadingNewSystems(false); // Update loading state
				});
		}
	}

	/**
	 * Handles updating the search text for the systems search bar.
	 * This function is called whenever the user types in the search bar.
	 * 
	 * @param value - The current text entered in the search bar.
	 */
	const handleTextToSearch = (value: string) => {
		setTextToSearch(value);
	}

	/**
	 * Handles navigation to the Atlases screen with the selected system's details.
	 * @param systemId - ID of the selected system
	 * @param name - Name of the selected system
	 */
	const handleNavigation = (systemId: number, name: string) => {
		navigation.navigate("Atlases", { systemId: systemId, name: name });
	}

	/**
	 * Filters the list of systems based on the current search text.
	 *
	 * This memoized function returns a filtered array of systems where the system's name
	 * includes the `textToSearch` value. The `useMemo` hook ensures that the filtering
	 * logic is only re-executed when either the `textToSearch` or `systems` array changes,
	 * optimizing performance by avoiding unnecessary recalculations.
	 *
	 * @returns {Array} - A filtered array of systems whose names include the search text.
	 *
	 * Dependencies:
	 * - `textToSearch`: The current value of the search bar (input text).
	 * - `systems`: The full list of systems to filter.
	 */
	const systemsFilter = useMemo(() => systems.filter(system => system.name.includes(textToSearch)), [textToSearch, systems]);

	return (
		isLoading ?
			< View style={styles.loading} >
				<ActivityIndicator size="large" />
			</View >
			:
			<View style={styles.root}>
				<SearchBar
					placeholder="Buscar un sistema..."
					value={textToSearch}
					onChangeText={(value: string) => handleTextToSearch(value)}
				/>
				<FlatList style={styles.root}
					data={systemsFilter}
					renderItem={({ item, index }) => <SystemItem item={item} key={index} handleNavigation={handleNavigation} />}
					onEndReached={handleEndReached}
					ListFooterComponent={
						loadingNewSystems ? <ActivityIndicator size="large" /> : null
					}
				/>
			</View>
	)
}

/**
 * SystemItem component that displays individual system details.
 * Handles user interaction for navigating to the system details.
 * 
 * * React.memo is used to optimize performance by preventing unnecessary re-renders. The component only re-renders 
 * if the `favourite` status of the system changes, as defined in the comparison function of React.memo.
 * 
 * @param item - The system object to be displayed
 * @param handleNavigation - Function to handle navigation to the system's details
 */
interface SystemItemProps {
	item: System,
	handleNavigation: (systemId: number, name: string) => void,
}

const SystemItem = React.memo(({ item, handleNavigation }: SystemItemProps) => {
	const dispatch = useAppDispatch();

	/**
	 * handleLike function handles the action of liking/unliking a system.
	 * Dispatches the likeSystem action with the system's id to toggle the favourite status in the Redux store.
	 */
	const handleLike = (): void => {
		dispatch(likeSystem(item.id));
	}

	return (
		<TouchableOpacity style={styles.item} onPress={() => handleNavigation(item.id, item.name)}>
			<View style={styles.itemHeader}>
				<Text style={styles.itemName}>{item.name}</Text>
				<View style={styles.timeZoneView}>
					<Clock color="#999" height={15} width={15} />
					<Text style={styles.timeZone}>{item.timeZone}</Text>
				</View>

				<TouchableOpacity onPress={handleLike}>
					{/* Conditionally render the heart icon based on whether the item is a favourite */}
					{
						item.favourite ?
							<HeartSolid color="#fb6962" height={20} width={20} />
							:
							<Heart color="black" height={20} width={20} />
					}
				</TouchableOpacity>
			</View>
			<Text>{item.description}</Text>
		</TouchableOpacity>
	)
}, (prev, next) => prev.item.favourite === next.item.favourite);
