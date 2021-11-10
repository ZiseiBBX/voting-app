/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./App.css";
import { FirebaseAppProvider, FirestoreProvider, AuthProvider, useUser } from "reactfire";
import { firebaseConfig } from "./services/firebase";
import Navbar from "./components/Navbar/Navbar";
import { ColorModeScript, Flex } from "@chakra-ui/react";
import theme from "./utils/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import { auth, firestore } from "./services/firebase"
import Profile from "./pages/Profile";
import { useUserStore } from "./store/userStore";
import NewPoll from "./pages/NewPoll";

function App() {
	return (
		<FirebaseAppProvider firebaseConfig={firebaseConfig}>
			<FirebaseComponents>
				<MainComponent>
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<BrowserRouter>
						<Flex height="100vh" direction="column">
							<Navbar />
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/login" element={<Home />} />
								<Route path="/profile" element={<Profile />} />
								<Route path="/new-poll" element={<NewPoll />} />
								<Route path="*" element={<Home />} />
							</Routes>
						</Flex>
					</BrowserRouter>
				</MainComponent>
			</FirebaseComponents>
		</FirebaseAppProvider>
	);
}

function FirebaseComponents({ children }: any) {
	return (
		<AuthProvider sdk={auth}>
			<FirestoreProvider sdk={firestore}>{children}</FirestoreProvider>
		</AuthProvider>
	);
}

function MainComponent({ children }: any) {
	const user = useUserStore(state => state.user)
	const fetchUserData = useUserStore(state => state.fetchUserData)
	const { status, data } = useUser()

	useEffect(() => {
		if (user.email === "" && data && status === "success") {
			fetchUserData(data.uid)
		}
	}, [data])

	return <>{children}</>
}

export default App;
