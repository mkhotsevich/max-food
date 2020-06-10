import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from "./routes"
import { useAuth } from "./hooks/auth.hook"
import { AuthContext } from "./context/AuthContext"
import { Navbar } from "./components/Navbar/Navbar"

function App() {
	const { token, login, logout, userId } = useAuth()
	const isAuthenticated = !!token
	const routes = useRoutes(isAuthenticated)
	return (
		<AuthContext.Provider value={
			{ token, login, logout, userId, isAuthenticated }
		}>
			<BrowserRouter>
				<Navbar />
				<div>
					{routes}
				</div>
			</BrowserRouter>
		</AuthContext.Provider>
	)
}

export default App
