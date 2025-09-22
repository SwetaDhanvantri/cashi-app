// App.js
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes"; // We'll create this

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
