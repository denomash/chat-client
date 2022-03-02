import { useEffect, useState } from "react";

const PREFIX = "chat-client-";

const usePersistData = (key, initialValue) => {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const fromLocalStorage = localStorage.getItem(prefixedKey);

    if (fromLocalStorage !== null) {
      return JSON.parse(fromLocalStorage);
    }
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    // const fromLocalStorage = localStorage.getItem(prefixedKey);

    // if (fromLocalStorage != null || fromLocalStorage !== "undefined")
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
};

export default usePersistData;
