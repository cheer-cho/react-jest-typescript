import ReactDOM from "react-dom/client";
import App from "@/App";

// Create a root.
const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

// Render your app.
root.render(<App />);
