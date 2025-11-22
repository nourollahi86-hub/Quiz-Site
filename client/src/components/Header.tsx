import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen } from "lucide-react";

interface HeaderProps {
  mode: "instructor" | "student";
  onModeChange: (mode: "instructor" | "student") => void;
}

export default function Header({ mode, onModeChange }: HeaderProps) {
  return (
    <header className="h-16 border-b flex items-center px-8">
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-semibold tracking-tight">True/False Quiz</h1>
        </div>
        
        <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
          <Button
            data-testid="button-student-mode"
            size="sm"
            variant={mode === "student" ? "default" : "ghost"}
            onClick={() => onModeChange("student")}
            className="gap-2"
          >
            <GraduationCap className="w-4 h-4" />
            Student
          </Button>
          <Button
            data-testid="button-instructor-mode"
            size="sm"
            variant={mode === "instructor" ? "default" : "ghost"}
            onClick={() => onModeChange("instructor")}
            className="gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Instructor
          </Button>
        </div>
      </div>
    </header>
  );
}
