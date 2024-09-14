import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: "white"
	},
	logoContainer: {
		marginTop: 100,
		marginBottom: 100,
		alignItems: "center",
	},
	logo: {
		height: 30
	},
	loginCredentialsContainer: {
		paddingLeft: 50,
		paddingRight: 50,
	}
});

export default styles;