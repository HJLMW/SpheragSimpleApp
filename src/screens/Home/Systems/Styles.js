import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/colors";

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: "white",
	},
	loading: {
		flex: 1,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
	},
	item: {
		justifyContent: "center",
		padding: 10,
		backgroundColor: "white",
		borderRadius: 10,
		marginBottom: 10,
		marginLeft: 10,
		marginRight: 10,
		shadowColor: "#ddd",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.8,
		shadowRadius: 10.00,
		elevation: 24,
		padding: 10,
	},
	itemName: {
		color: COLORS.PRIMARY,
		fontSize: 16,
		fontWeight: "bold",
		flex: 1,
	},
	itemHeader: {
		flexDirection: "row",
		alignItems: "center",
	},
	timeZone: {
		marginRight: 10,
		opacity: 0.3,
		paddingLeft: 5
	},
	timeZoneView: {
		flexDirection: "row",
		alignItems: "center",
	}
});

export default styles;