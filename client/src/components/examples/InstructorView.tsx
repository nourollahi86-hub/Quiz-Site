import { useState } from "react";
import InstructorView from "../InstructorView";
import { type Question } from "@shared/schema";

export default function InstructorViewExample() {
  const [questions, setQuestions] = useState<Question[]>([
    { id: "1", text: "The Earth revolves around the Sun." },
    { id: "2", text: "Water freezes at 0°C at sea level." },
    { id: "3", text: "The Great Wall of China is visible from space." },
  ]);

  return (
    <InstructorView 
      questions={questions} 
      onQuestionsChange={setQuestions} 
    />
  );
}
