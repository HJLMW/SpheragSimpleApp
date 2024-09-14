import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/colors";

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
	},
	itemName: {
		fontSize: 16,
		fontWeight: "bold",
		flex: 1,
		color: COLORS.PRIMARY,
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
	},

	container: {
		backgroundColor: "white",
		padding: 10,
		flex: 1,
	},
	section: {
		backgroundColor: "white",
	},
	connectorSection: {
		backgroundColor: "white",
		marginBottom: 16,
	},
	subtitle: {
		fontSize: 16,
		fontWeight: '600',
		marginTop: 3,
		marginBottom: 10,
		color: COLORS.PRIMARY
	},
	connector: {
		marginBottom: 8,
	},
	connectorTitle: {
		fontSize: 16,
	},
	connectorResult: {
		opacity: 0.5
	},
	row: {
		backgroundColor: "white",
		gap: 10,
		marginBottom: 10,
		borderRadius: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	column: {
		gap: 3,
		padding: 5,
		flex: 1,
		borderRadius: 10,
		alignItems: 'flex-start',
		backgroundColor: '#fff',
		shadowColor: "#ddd",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.8,
		shadowRadius: 10.00,
		elevation: 24,
	},
	rowChild: {
		flexDirection: "row",
		alignItems: "center"
	},
	columnChild: {
		flexDirection: "column",
		flex: 1

	},
	sectionTitle: {
		fontWeight: "bold",
		fontSize: 18,
		marginBottom: 10
	},
	connectorsTitle: {
		fontWeight: "bold",
		fontSize: 18,
		marginBottom: 10,
		marginTop: 20
	},
	result: {
		opacity: 0.5
	},
	mapView: {
		height: 100,
		width: Dimensions.get("window").width - 20,
		height: (Dimensions.get("window").width - 20) / 2,
		borderRadius: 10,
		overflow: "hidden",
	},
	connectorPin: {
		zIndex: 9,
		padding: 10,
		backgroundColor: "white",
		borderRadius: 100
	},
	connectorPinText: {
		fontWeight: "bold"
	}
});

export default styles;