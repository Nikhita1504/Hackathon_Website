import { isAdmin, isTokenValid } from "../../Utils/utils";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  if (isTokenValid()) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

const Admin = ({ children }) => {
  if (isTokenValid() && isAdmin()) {
    return children;
  } else {
    <Navigate to="/login"></Navigate>
  }
};

export { Protected, Admin };
