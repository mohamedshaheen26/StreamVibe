import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useReloadOnNavigate = () => {
  const location = useLocation();

  useEffect(() => {
    window.location.reload();
  }, [location.pathname]);
};

export default useReloadOnNavigate;
