import React from "react"

export default function useSavedTheme(){
    const [state, setState] = React.useState(() => {
      const persistedState = typeof window !== 'undefined' && localStorage.getItem('theme');
    return persistedState ? JSON.parse(persistedState) : true;
    });
    React.useEffect(() => {
      window.localStorage.setItem('theme', state);
    }, [state, 'theme']);
    return [state, setState];
  };