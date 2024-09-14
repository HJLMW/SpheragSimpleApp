import { user } from "../states/userSlice";

export enum Method {
	GET = "GET",
	POST = "POST",
	DELETE = "DELETE",
	PUT = "PUT"

}

const URI = "https://preapicore.spherag.com" as const;
const URI_AUTH = "https://preapi.spherag.com/Authentication/Login" as const;

/**
 * Makes an API request to the specified endpoint with the given method and body.
 * @param whereTo - The endpoint to request, appended to the base URI.
 * @param method - The HTTP method to use (GET, POST, DELETE, PUT).
 * @param body - Optional request body to be sent with the request. 
 * @returns A promise that resolves with the response data if the request was successful, or false if there was no response.
 */
export async function spheragApi(whereTo: string, method: Method, body?: Object) {
	const headers = {
		"content-type": "application/json",
		"Authorization": "Bearer " + user.token
	};

	const fetchOptions = {
		method: method,
		headers: headers,
		body: body ? JSON.stringify(body) : undefined,
	};

	// Remove body from options if it's undefined
	if (fetchOptions.body === undefined)
		delete fetchOptions.body;

	return fetch(URI + whereTo, fetchOptions)
		.then(result => {
			if (result.status === 200) {
				return result.json(); // Return JSON data if status is 200
			}

			if (result.status >= 400) {
				throw new Error(JSON.stringify(result)); // Throw error for status >= 400
			}

			return false; // Return false for other statuses
		})
		.then(data => {
			return data; // Return the data
		});
}

interface LoginProps {
	username: string;
	password: string;
}

/**
 * Logs in a user with the provided username and password.
 * @param username - The username of the user attempting to log in.
 * @param password - The password of the user attempting to log in.
 * @returns A promise that resolves with the response data from the login request.
 */
export async function spheragApiLogin({ username, password }: LoginProps) {
	const headers = {
		"content-type": "application/json",
	};

	const fetchOptions = {
		method: 'POST',
		headers: headers,
		body: JSON.stringify({
			username: username,
			password: password
		})
	};

	return fetch(URI_AUTH, fetchOptions)
		.then(result => result.json()) // Parse and return JSON data
		.then(data => data); // Return the data
}