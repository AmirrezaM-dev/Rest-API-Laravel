import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { HashRouter as Router } from "react-router-dom"
import { DataProvider } from "./Components/DataContext"
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	//<React.StrictMode>
	<Router>
		<DataProvider>
			<App />
		</DataProvider>
	</Router>
	//</React.StrictMode>
)
