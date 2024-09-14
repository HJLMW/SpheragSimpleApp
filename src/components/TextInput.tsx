import { NativeSyntheticEvent, TextInput as RNTextInput, StyleProp, StyleSheet, TextInputFocusEventData, TextStyle, ViewStyle } from "react-native";
import { COLORS } from "../constants/colors";
import { useState } from "react";

/**
 * TextInput component that renders a customizable input field with various options.
 * Supports password fields, required fields, and custom styling.
 * It also provides focus handling and visual feedback for focused and required inputs.
 * 
 * @component
 * 
 * @param {TextInputProps} props - The props for the TextInput component.
 * @param {string} props.placeholder - Placeholder text for the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {function} props.onChangeText - Function to handle changes to the input field's text.
 * @param {boolean} [props.isPassword] - Determines if the input should be a password field (default is false).
 * @param {boolean} props.required - Indicates if the input field is required (affects styling).
 * @param {StyleProp<ViewStyle>} [props.styles] - Custom styles to apply to the input field.
 * 
 * @returns {JSX.Element} A customizable input field component with optional password and required state support.
 */

interface TextInputProps {
	placeholder: string;  // Placeholder text for the input field
	value: string;        // Current value of the input field
	onChangeText: (text: string) => void;  // Function to handle text changes
	isPassword?: boolean; // If true, the input will hide text (password mode)
	required: boolean;    // Determines if the field is required (changes the border color to red)
	styles?: StyleProp<ViewStyle>;  // Optional custom styles for the input
}

export default function TextInput({
	placeholder,
	value,
	onChangeText,
	isPassword = false,
	required,
	styles
}: TextInputProps): JSX.Element {
	const [isFocused, setIsFocused] = useState(false);  // Tracks the focus state of the input

	// Determine base styles based on whether the field is required
	const baseStyle = required ? textInputStyles.textInputRequired : textInputStyles.textInput;
	const inputStyles = styles ? [styles, baseStyle] : baseStyle;

	// Handlers for when the input gains or loses focus
	const handleFocus = (): void => setIsFocused(true);
	const handleBlur = (): void => setIsFocused(false);

	return (
		<RNTextInput
			onFocus={handleFocus}
			onBlur={handleBlur}
			placeholder={placeholder}
			value={value}
			onChangeText={onChangeText}
			placeholderTextColor={COLORS.textInput.PLACEHOLDER_COLOR}
			textContentType={isPassword ? "password" : "none"}  // Set the content type based on whether it's a password field
			secureTextEntry={isPassword}  // Hide text if it's a password field
			style={[inputStyles, (isFocused && !required) && textInputStyles.textInputFocus]}  // Apply focus styles if the input is focused
		/>
	);
}

const textInputStyles = StyleSheet.create({
	textInput: {
		borderColor: COLORS.textInput.BORDER_COLOR,  // Default border color
		borderWidth: 1,
		borderRadius: 10,
		padding: 15,
		fontSize: 16,
	},
	textInputRequired: {
		borderColor: COLORS.DANGER,  // Red border if the field is required
		borderWidth: 1,
		borderRadius: 10,
		padding: 15,
		fontSize: 16,
	},
	textInputFocus: {
		borderColor: COLORS.PRIMARY,  // Change border color when the input is focused
	},
});

