import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import InstructorView from "@/components/InstructorView";
import StudentView from "@/components/StudentView";
import { type Question } from "@shared/schema";

function App() {
  const [mode, setMode] = useState<"instructor" | "student">("student");
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleStudentSubmit = (studentName: string, answers: Record<string, boolean>) => {
    console.log("Quiz submitted:", { studentName, answers });
    // TODO: Send to Google Sheets via backend API
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Header mode={mode} onModeChange={setMode} />
          <main className="flex-1">
            {mode === "instructor" ? (
              <InstructorView questions={questions} onQuestionsChange={setQuestions} />
            ) : (
              <StudentView questions={questions} onSubmit={handleStudentSubmit} />
            )}
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
