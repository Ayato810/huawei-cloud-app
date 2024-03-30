import { create } from 'zustand';

type Topic = {
  name: string;
  checked: boolean;
};

type State = {
  questions: Question[];
  topics: Topic[];
  numberOfQuestions: string | number;
  time: string | number;
};

type Action = {
  setNumberOfQuestions: (questions: string | number) => void;
  setTime: (time: string | number) => void;
  toggleTopic: (topicName: string) => void;
  addQuestion: (question: Question) => void;
  updateUserAnswer: (questionIndex: number, userAnswer: string) => void;
};

export const useMockTestStore = create<State & Action>()((set) => ({
  questions: [],
  topics: [
    { name: 'Cloud Basics', checked: true },
    { name: 'Compute Cloud Services', checked: false },
    { name: 'Network Cloud Services', checked: false },
    { name: 'Storage Cloud Services', checked: false },
    { name: 'Database, Security, and other Services', checked: false },
    { name: 'Huawei Cloud O&M Basics', checked: false },
  ],
  numberOfQuestions: 65,
  time: 90,
  setNumberOfQuestions: (numberOfQuestions: any) => set(() => ({ numberOfQuestions })),
  setTime: (time: any) => set(() => ({ time })),
  toggleTopic: (topicName: string) =>
    set((state) => ({
      topics: state.topics.map((topic) =>
        topic.name === topicName ? { ...topic, checked: !topic.checked } : topic
      ),
    })),
  addQuestion: (question: Question) =>
    set((state) => ({
      questions: [...state.questions, question],
    })),
    updateUserAnswer: (questionIndex: number, userAnswer: string) =>
    set((state) => ({
      questions: state.questions.map((question, index) =>
        index === questionIndex ? { ...question, user_answer: userAnswer } : question
      ),
    })),
}));
