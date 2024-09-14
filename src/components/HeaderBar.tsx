import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ArrowLeft, LogOut } from "iconoir-react-native";
import { COLORS } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../utils/reduxHookTypes";
import { deleteUser } from "../states/userSlice";

interface HeaderBarProps {
	title: string,          // The title to be displayed in the header
	canGoBack?: boolean,   // Optional: Indicates if a back button should be shown
	showLogout?: boolean   // Optional: Indicates if a logout button should be shown
}

/**
 * HeaderBar component that displays a title and optional navigation controls.
 * Includes a back button and a logout button if specified.
 * 
 * @param title - The title to be displayed in the header
 * @param canGoBack - Optional flag to show the back button
 * @param showLogout - Optional flag to show the logout button
 */
export default function HeaderBar({ title, canGoBack, showLogout }: HeaderBarProps) {
	const dispatch = useAppDispatch(); // Hook to dispatch actions to Redux store
	const navigation = useNavigation(); // Hook to access navigation functions

	/**
	 * Handles the action of navigating back to the previous screen.
	 * Only performs navigation if there is a screen to go back to.
	 */
	const handleGoBack = (): void => {
		if (navigation.canGoBack())
			navigation.goBack();
	}

	/**
	 * Handles the action of logging out the user.
	 * Displays an alert to confirm the logout action and dispatches an action to delete the user.
	 */
	const handleLogout = (): void => {
		Alert.alert(
			"Cerrar sesión",   // Alert title
			"¿Estás seguro de que quieres salir?", // Alert message
			[
				{
					text: "Cancelar",   // Button to cancel the logout
					onPress: () => null,
					style: "cancel"
				},
				{
					text: "Continuar",  // Button to confirm the logout
					onPress: () => {
						dispatch(deleteUser()); // Dispatch action to delete user from Redux store
					},
					style: "destructive"
				}
			],
			{ cancelable: false } // Optional: Prevents the alert from closing when tapping outside of the modal
		);
	}

	return (
		<View style={styles.root}>
			{/* Conditionally render the back button if canGoBack is true */}
			{canGoBack && <TouchableOpacity onPress={handleGoBack}>
				<ArrowLeft width={25} height={25} color={COLORS.PRIMARY} style={styles.icon} />
			</TouchableOpacity>}

			{/* Display the title in the header */}
			<Text style={styles.title}>
				{title}
			</Text>

			{/* Conditionally render the logout button if showLogout is true */}
			{showLogout && <TouchableOpacity onPress={handleLogout}>
				<LogOut width={25} height={25} color={COLORS.PRIMARY} />
			</TouchableOpacity>}
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "white",
		padding: 20
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: COLORS.PRIMARY, // Default primary color
		flex: 1
	},
	icon: {
		marginRight: 20
	}
});