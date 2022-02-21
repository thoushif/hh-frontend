import React from "react";

const ModeContext = React.createContext();
function useModeSwitch() {
  const context = React.useContext(ModeContext);
  if (!context) {
    throw new Error(`useModeSwitch must be used within a ToggleModeProvider`);
  }
  return context;
}
function ToggleModeProvider(props) {
  const [mode, setMode] = React.useState(false);
  const value = React.useMemo(() => [mode, setMode], [mode]);
  return <ModeContext.Provider value={value} {...props} />;
}
export { ToggleModeProvider, useModeSwitch };
