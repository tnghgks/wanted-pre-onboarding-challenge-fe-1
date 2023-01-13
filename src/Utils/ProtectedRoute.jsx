const ProtectedRoute = ({ isToken, children }) => {
  if (!isToken) {
    console.log("토큰없음 실행");
    window.location.href = "/login";
    return;
  }

  return children;
};

export default ProtectedRoute;
