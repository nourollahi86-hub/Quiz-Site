import { useState } from "react";
import Header from "../Header";

export default function HeaderExample() {
  const [mode, setMode] = useState<"instructor" | "student">("student");
  
  return (
    <Header 
      mode={mode} 
      onModeChange={(newMode) => {
        console.log(`Mode changed to: ${newMode}`);
        setMode(newMode);
      }} 
    />
  );
}
