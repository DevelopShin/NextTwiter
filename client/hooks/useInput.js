import { useState, useCallback } from "react";

const useInput = (initialValue) => {
  const [value, setvalue] = useState(initialValue);

  const handler = useCallback((e) => {
    setvalue(e.target.value);
  }, []);

  return [value, handler, setvalue];
};

export default useInput;
