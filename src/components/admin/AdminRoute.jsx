import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  // Not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin
  if (currentUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Is admin
  return children;
};

export default AdminRoute;
