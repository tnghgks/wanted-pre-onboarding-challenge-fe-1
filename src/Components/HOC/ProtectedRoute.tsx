const ProtectedRoute = ({ isToken, children }: { isToken: boolean; children: JSX.Element }) => {
  if (!isToken) {
    window.location.href = "/login";
    return null;
  }

  return children;
};

export default ProtectedRoute;
