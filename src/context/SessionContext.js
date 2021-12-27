import { createContext, useState, useEffect, useContext } from 'react';

const SessionContext = createContext();

// Local Storage Hook
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = JSON.parse(localStorage.getItem(key));
    if (storedValue) return storedValue;
    if (initialValue instanceof Function) return initialValue();
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Session Provider
function SessionProvider(props) {
  const [session, setSession] = useLocalStorage('sessionInfo', null);
  return <SessionContext.Provider value={[session, setSession]} {...props} />;
}

// Use Session Hook
function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error('Not inside SessionProvider.');
  return context; // const [session, setSession] = useSession()
}

export { useSession, SessionProvider };
