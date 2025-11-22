import StudentView from "../StudentView";
import { type Question } from "@shared/schema";

const mockQuestions: Question[] = [
  { id: "1", text: "The Earth revolves around the Sun." },
  { id: "2", text: "Water freezes at 0°C at sea level." },
  { id: "3", text: "The Great Wall of China is visible from space with the naked eye." },
  { id: "4", text: "Lightning never strikes the same place twice." },
  { id: "5", text: "Humans use only 10% of their brain." },
];

export default function StudentViewExample() {
  const handleSubmit = (studentName: string, answers: Record<string, boolean>) => {
    console.log("Student submission:", { studentName, answers });
    alert(`Quiz submitted by ${studentName}!`);
  };

  return (
    <StudentView 
      questions={mockQuestions} 
      onSubmit={handleSubmit} 
    />
  );
}
