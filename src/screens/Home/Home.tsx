import { Keyboard, SafeAreaView, TouchableWithoutFeedback, View } from "react-native";
import styles from "./Styles";
import Systems from "./Systems/Systems";
import HeaderBar from "../../components/HeaderBar";

/**
 * Home component that displays a list of systems (farms).
 * Includes a header and a list of systems.
 */
export default function Home() {

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<>
				{/* SafeAreaView to handle notches and screen edges */}
				<SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />

				<View style={styles.root}>
					{/* HeaderBar component displaying the title "Fincas" and a logout button */}
					<HeaderBar title="Fincas" showLogout />

					{/* Systems component that lists the available systems (farms) */}
					<Systems />
				</View>
			</>
		</TouchableWithoutFeedback>
	);
}