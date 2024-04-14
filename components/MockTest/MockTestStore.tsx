import { create } from 'zustand';

type Topic = {
  name: string;
  numberOfQuestions: number;
  endpoint: string;
};

type State = {
  questions: Question[];
  topics: Topic[];
  totalNumberOfQuestions: string | number;
  time: string | number;
};

type Action = {
  setTotalNumberOfQuestions: (questions: string | number) => void;
  setTime: (time: string | number) => void;
  addQuestion: (question: Question) => void;
  updateUserAnswer: (questionIndex: number, userAnswer: string) => void;
  setTopicNumberOfQuestions: (topicIndex: number, numberOfQuestions: number) => void;
  addQuestionAtIndex: (question: Question, index: number) => void;
};

export const useMockTestStore = create<State & Action>()((set) => ({
  questions: [],
  topics: [
    { name: 'Cloud Basics', numberOfQuestions: 8, endpoint: 'cloud-basics' },
    { name: 'Compute Cloud Services', numberOfQuestions: 11, endpoint: 'compute-cloud-services' },
    { name: 'Network Cloud Services', numberOfQuestions: 11, endpoint: 'network-cloud-services' },
    { name: 'Storage Cloud Services', numberOfQuestions: 11, endpoint: 'storage-cloud-services' },
    {
      name: 'Database, Security, and other Services',
      numberOfQuestions: 6,
      endpoint: 'database-security-other-services',
    },
    { name: 'Huawei Cloud O&M Basics', numberOfQuestions: 8, endpoint: 'huawei-cloud-o-m-basics' },
  ],
  totalNumberOfQuestions: 55,
  time: 90,
  setTotalNumberOfQuestions: (totalNumberOfQuestions: any) =>
    set(() => ({ totalNumberOfQuestions })),
  setTime: (time: any) => set(() => ({ time })),
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
  setTopicNumberOfQuestions: (topicIndex: number, numberOfQuestions: number) =>
    set((state) => ({
      topics: state.topics.map((topic, index) =>
        index === topicIndex ? { ...topic, numberOfQuestions } : topic
      ),
    })),
  addQuestionAtIndex: (question: Question, index: number) =>
    set((state) => ({
      questions: [...state.questions.slice(0, index), question, ...state.questions.slice(index)],
    })),
}));
