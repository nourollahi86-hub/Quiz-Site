import { type Question } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getQuestions(): Promise<Question[]>;
  setQuestions(questions: Question[]): Promise<void>;
}

export class MemStorage implements IStorage {
  private questions: Question[];

  constructor() {
    this.questions = [];
  }

  async getQuestions(): Promise<Question[]> {
    return this.questions;
  }

  async setQuestions(questions: Question[]): Promise<void> {
    this.questions = questions;
  }
}

export const storage = new MemStorage();
