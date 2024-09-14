import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/colors";

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},
	root: {
		flex: 1,
		backgroundColor: "white",
	},
	center: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		opacity: 0.5,
	},
	item: {
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
		fontSize: 16,
		fontWeight: "bold",
		flex: 1,
		color: COLORS.PRIMARY,
	},
	emptyText: {
		marginTop: 10
	},
	itemHeader: {
		flexDirection: "row"
	},
	timeZone: {
		marginRight: 10,
		opacity: 0.3,
		paddingLeft: 5
	},
	timeZoneView: {
		flexDirection: "row",
		alignItems: "center",
	},
	flexView: {
		flexDirection: "row",
		alignItems: "center",
	},
	imei: {
		opacity: 0.5,
	},
	batteryText: {
		opacity: 0.5,
		marginRight: 5
	},
	batteryIcon: {
		opacity: 0.5,
		marginLeft: 5
	},
	batteryText: {
		opacity: 0.5,
		fontSize: 12
	},
	typeText: {
		fontSize: 16,
		flex: 1,
		marginTop: 10
	},
	expiredDate: {
		flex: 1,
	},
	signalText: {
		opacity: 0.5,
		fontSize: 12
	},
	signalIcon: {
		opacity: 0.7,
		marginLeft: 5
	},
	flexRow: {
		flexDirection: "row",
		flex: 1,
		opacity: 0.5
	},
	clockIcon: {
		marginRight: 5
	}
});

export default styles;