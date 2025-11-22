import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Upload, X, BookOpen } from "lucide-react";
import { type Question } from "@shared/schema";

interface InstructorViewProps {
  questions: Question[];
  onQuestionsChange: (questions: Question[]) => void;
}

export default function InstructorView({ questions, onQuestionsChange }: InstructorViewProps) {
  const [questionText, setQuestionText] = useState("");

  const handleUploadQuestions = () => {
    const lines = questionText.trim().split('\n').filter(line => line.trim());
    const newQuestions: Question[] = lines.map((text, index) => ({
      id: `q-${Date.now()}-${index}`,
      text: text.trim(),
    }));
    
    onQuestionsChange([...questions, ...newQuestions]);
    setQuestionText("");
    console.log(`Uploaded ${newQuestions.length} questions`);
  };

  const handleDeleteQuestion = (id: string) => {
    onQuestionsChange(questions.filter(q => q.id !== id));
    console.log(`Deleted question: ${id}`);
  };

  const handleClearAll = () => {
    onQuestionsChange([]);
    setQuestionText("");
    console.log("Cleared all questions");
  };

  return (
    <div className="max-w-3xl mx-auto px-8 py-12 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Quiz Management</h2>
        <p className="text-muted-foreground">Upload and manage your True/False questions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Questions</CardTitle>
          <CardDescription>Enter one True/False question per line</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            data-testid="textarea-questions"
            placeholder="Example:&#10;The Earth is flat.&#10;Water boils at 100°C at sea level.&#10;The sun rises in the west."
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="min-h-64 resize-none text-base"
          />
          <div className="flex gap-4">
            <Button
              data-testid="button-upload"
              onClick={handleUploadQuestions}
              disabled={!questionText.trim()}
              className="gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload Questions
            </Button>
            {questions.length > 0 && (
              <Button
                data-testid="button-clear-all"
                variant="outline"
                onClick={handleClearAll}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                Clear All Questions
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {questions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Current Questions ({questions.length})</CardTitle>
            <CardDescription>Review and manage uploaded questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  data-testid={`question-item-${index}`}
                  className="flex items-start gap-4 p-4 rounded-lg hover-elevate active-elevate-2 bg-muted/50"
                >
                  <Badge 
                    variant="secondary" 
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full"
                  >
                    {index + 1}
                  </Badge>
                  <p className="flex-1 text-base leading-relaxed">{question.text}</p>
                  <Button
                    data-testid={`button-delete-${index}`}
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDeleteQuestion(question.id)}
                    className="flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {questions.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">No questions uploaded yet</p>
            <p className="text-sm text-muted-foreground">Use the form above to add True/False questions</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
