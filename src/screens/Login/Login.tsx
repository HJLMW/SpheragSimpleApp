import { ActivityIndicator, GestureResponderEvent, Image, Keyboard, SafeAreaView, TouchableWithoutFeedback, View } from "react-native";
import styles from "./Styles";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { useState } from "react";
import { spheragApiLogin } from "../../utils/api";
import { useAppDispatch } from "../../utils/reduxHookTypes";
import { saveUser } from "../../states/userSlice";

/**
 * Login component that handles user authentication.
 * Manages form data and submission, and displays loading states.
 */
export default function Login() {

	const dispatch = useAppDispatch();
	const [required, setRequired] = useState(false); // State to track if fields are required
	const [isLoading, setIsLoading] = useState(false); // State to track loading status
	const [formData, setFormData] = useState({
		username: "testUserIII@spherag.com", // Default username for testing
		password: "T3stP4ss789!" // Default password for testing
	});

	/**
	 * Updates the username in the form data state.
	 * @param text - The new username value
	 */
	const handleUsername = (text: string): void => setFormData(prevFormData => ({ ...prevFormData, username: text }));

	/**
	 * Updates the password in the form data state.
	 * @param text - The new password value
	 */
	const handlePassword = (text: string): void => setFormData(prevFormData => ({ ...prevFormData, password: text }));

	/**
	 * Handles form submission. Validates input and performs login request.
	 * @param event - The gesture event triggered by pressing the submit button
	 */
	const handleSubmit = (event: GestureResponderEvent): void => {
		// Check if username or password is empty and show error if needed
		if (formData.username.localeCompare("") === 0 || formData.password.localeCompare("") === 0) {
			setRequired(true);
			setTimeout(() => setRequired(false), 5000); // Hide error message after 5 seconds
			return;
		}

		setIsLoading(true); // Show loading spinner

		// Call the API to perform login
		spheragApiLogin(formData)
			.then(response => {
				if (response.token) {
					// Save user data in Redux store if login is successful
					dispatch(saveUser({
						username: formData.username,
						token: response.token
					}));
				}
			});
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
				<View style={styles.logoContainer}>
					<Image source={require("../../images/spherag-logo.png")} style={styles.logo} resizeMode="contain" />
				</View>
				<View style={styles.loginCredentialsContainer}>

					{
						!isLoading ?
							<>
								<TextInput
									required={formData.username.localeCompare("") === 0 && required}
									value={formData.username}
									placeholder="Usuario"
									onChangeText={handleUsername}
								/>
								<TextInput
									required={formData.password.localeCompare("") === 0 && required}
									value={formData.password}
									placeholder="Contraseña"
									styles={{ marginTop: 10 }}
									isPassword
									onChangeText={handlePassword}
								/>

								<Button
									title="Iniciar sesión"
									onPress={handleSubmit}
									styles={{ marginTop: 20 }}
								/>
							</>
							: <ActivityIndicator size="large" />
					}

				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}
