export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface Option {
  label: string;
  nextQuestionId?: string;
  recommendation?: string;
  action?: string;
}

export interface UserResponse {
  questionId: string;
  optionLabel: string;
}

export interface AssistantState {
  currentQuestionId: string;
  responses: UserResponse[];
  recommendations: string[];
}
