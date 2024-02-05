import "./App.css";
import Landing from "./pages/landing";
import Homepage from "./pages/homepage";
import { RootState, useAppSelector } from "./redux/store";
import { connect } from "react-redux";

const mapStateToProps = (state: RootState) => ({
  historyLength: state.history.values.length,
});

function App() {
  const historyLength = useAppSelector((state) => state.history.length);

  return <>{historyLength > 0 ? <Homepage /> : <Landing />}</>;
}

export default connect(mapStateToProps)(App);
