import { useAppSelector } from "../utils/reduxHookTypes";
import Login from "./Login/Login";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import Home from "./Home/Home";
import Atlases from "./Home/Atlases/Atlases";
import Atlas from "./Home/Atlases/Atlas/Atlas";

export interface StackParamProps extends ParamListBase {
	Atlases: { 
		systemId: number,
		name: string
	},
	Atlas: {
		imei: string,
		name: string
	},
	Home: undefined,
	Login: undefined
}

const Stack = createNativeStackNavigator<StackParamProps>();

/**
 * Creates a stack navigator to manage navigation between different screens in the application.
 */
export default function AppScreens() {
	// Retrieves the username from the global state to determine if the user is logged in.
	const userIsLoggedIn = useAppSelector((state) => state.user.username);

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Login"
				screenOptions={{
					animation: "simple_push",
					headerShown: false,
				}}
			>
				{
					// Checks if the user is logged in to display the corresponding screens.
					userIsLoggedIn ?
						<>
							<Stack.Screen options={{ animation: "fade" }} name="Systems">{({ route, navigation }) => <Home />}</Stack.Screen>
							<Stack.Screen name="Atlases">{({ route, navigation }) => <Atlases />}</Stack.Screen>
							<Stack.Screen name="Atlas">{({ route, navigation }) => <Atlas />}</Stack.Screen>
						</>
						:
						<Stack.Screen options={{ animation: "fade" }} name="Login">{({ route, navigation }) => <Login />}</Stack.Screen>
				}
			</Stack.Navigator>
		</NavigationContainer>
	)
}