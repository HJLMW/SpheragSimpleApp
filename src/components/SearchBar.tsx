import { StyleSheet, View } from "react-native";
import TextInput from "./TextInput";
import { COLORS } from "../constants/colors";

interface SearchBarProps {
	placeholder: string,
	value: string,
	onChangeText: (value: string) => void,
}

export default function SearchBar({ placeholder, value, onChangeText } : SearchBarProps) {
	return(
		<View style={styles.root}>
			<TextInput
				styles={styles.textInput}
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
				required={false}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		marginHorizontal: 10,
		marginBottom: 10
	},
	textInput: {
		backgroundColor: "white",
	}
});