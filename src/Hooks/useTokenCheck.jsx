import { useEffect, useState } from "react";

const useTokenCheck = () => {
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    localStorage.getItem("token") ? setIsToken(true) : setIsToken(false);
  }, []);

  return { isToken };
};

export default useTokenCheck;
