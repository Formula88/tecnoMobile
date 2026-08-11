import AppContext from "./context/AppContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <AppContext>
        <AppRoutes />
      </AppContext>
    </>
  );
}

export default App;
