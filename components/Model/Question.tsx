interface Question {
    id: number;
    statement: string;
    alternatives: { [key: string]: string };
    correct_answer: string;
    explanations: { [key: string]: string };
    user_answer: string;
}
