import { GestureResponderEvent, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/colors";

/**
 * Button component that renders a touchable button with customizable styles and a title.
 * The button responds to user interactions through the `onPress` prop, executing the provided callback when pressed.
 * 
 * This component uses `TouchableOpacity` for its press behavior, which provides a subtle fade effect on press.
 * 
 * @component
 * 
 * @param {ButtonProps} props - The props for the Button component.
 * @param {string} props.title - The text to display inside the button.
 * @param {function} props.onPress - Function to be called when the button is pressed. It receives a `GestureResponderEvent` as an argument.
 * @param {StyleProp<TextStyle>} [props.styles] - Optional styles to be applied to the button in addition to the default styles.
 * 
 * @returns {JSX.Element} A button component that displays a title and handles press events.
 */

interface ButtonProps {
	title: string;  // The title or label of the button
	onPress: (event: GestureResponderEvent) => void;  // Callback function triggered on button press
	styles?: StyleProp<TextStyle>;  // Optional additional styles for the button
}

export default function Button({ title, onPress, styles }: ButtonProps): JSX.Element {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={styles ? [styles, buttonStyles.button] : buttonStyles.button}  // Merge custom styles with default styles if provided
		>
			<Text style={buttonStyles.textButton}>{title}</Text>
		</TouchableOpacity>
	);
}

const buttonStyles = StyleSheet.create({
	/**
	 * Default button style.
	 * Background color is sourced from a global COLORS object, and the button is padded and rounded for better touch interaction.
	 */
	button: {
		backgroundColor: COLORS.button.BACKGROUND_COLOR,  // The default background color for the button
		borderRadius: 10,  // Rounded corners with a radius of 10
		padding: 15,  // Padding around the button's content
	},
	/**
	 * Default text style for the button's label.
	 * The text is bold, centered, and uses a primary color sourced from a global COLORS object.
	 */
	textButton: {
		fontSize: 16,  // Font size for the button's text
		color: COLORS.PRIMARY,  // Text color sourced from global COLORS
		fontWeight: "bold",  // Makes the text bold
		textAlign: "center"  // Centers the text horizontally
	}
});
