import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import Register from "../pages/Register";
import Login from "../pages/Login";
import UploadFileJson from "../pages/UploadJsonFile";
import JsonDataList from "../pages/JsonDataList";

function App() {
  const { accessToken } = useSelector(
    ({ auth }) => ({
      accessToken: auth.accessToken,
    }),
    shallowEqual
  );
  return (
    <Router>
      {accessToken ? (
        <Routes>
          <Route path="*" element={<Navigate to={"/"} />} />
          <Route path={"/"} element={<UploadFileJson />} />
          <Route path={"/json-list"} element={<JsonDataList />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<Navigate to={"/"} />} />
          <Route path={"/"} element={<Login />} />
          <Route path={"/signup"} element={<Register />} />
          <Route path={"/login"} element={<Login />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
