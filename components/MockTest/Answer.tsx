import { useQueries, useQuery } from '@tanstack/react-query';
import { getQuestion } from './Queries';
import {
  Accordion,
  CheckIcon,
  Radio,
  Skeleton,
  Stack,
  Title,
  rem,
  Notification,
  Grid,
  Progress,
  Button,
  Group,
  Modal,
  Badge,
  ThemeIcon,
  Alert,
} from '@mantine/core';
import Timer from './Timer';
import { useMockTestStore } from './MockTestStore';
import { useEffect, useState } from 'react';
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconCircle,
  IconSend,
  IconX,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

export function Answer() {
  const { questions, time, numberOfQuestions } = useMockTestStore();
  const totalOfQuestions =
    typeof numberOfQuestions === 'string' ? parseInt(numberOfQuestions) : numberOfQuestions;

  const timeInMinutes = typeof time === 'string' ? parseInt(time) : time;

  const [currentQuestionId, setCurrentQuestionId] = useState(0);

  const correctAnswer = questions[currentQuestionId]?.correct_answer;
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  const circlelIcon = <IconCircle style={{ width: rem(20), height: rem(20) }} />;

  return (
    <>
      <Stack>
        <Group justify="space-between">
          <Title order={4} c="blue">
            Question {currentQuestionId + 1} of {numberOfQuestions}
          </Title>
          <ThemeIcon
            color={questions[currentQuestionId]?.user_answer === correctAnswer ? 'teal' : 'red'}
            radius="xl"
          >
            {questions[currentQuestionId]?.user_answer === correctAnswer ? checkIcon : xIcon}
          </ThemeIcon>
        </Group>
        <Progress value={currentQuestionId + 1} size="lg" transitionDuration={totalOfQuestions} />
        {questions[currentQuestionId]?.statement}
        <Alert
          variant="light"
          color={
            correctAnswer === 'a'
              ? 'teal'
              : questions[currentQuestionId]?.user_answer === 'a'
                ? 'red'
                : 'gray'
          }
          title={questions[currentQuestionId]?.alternatives.a}
          icon={
            questions[currentQuestionId]?.user_answer === 'a' && correctAnswer === 'a'
              ? checkIcon
              : questions[currentQuestionId]?.user_answer === 'a'
                ? xIcon
                : circlelIcon
          }
        >
          {questions[currentQuestionId]?.explanations.a}
        </Alert>
        <Alert
          icon={
            questions[currentQuestionId]?.user_answer === 'b' && correctAnswer === 'b'
              ? checkIcon
              : questions[currentQuestionId]?.user_answer === 'b'
                ? xIcon
                : circlelIcon
          }
          color={
            correctAnswer === 'b'
              ? 'teal'
              : questions[currentQuestionId]?.user_answer === 'b'
                ? 'red'
                : 'gray'
          }
          title={questions[currentQuestionId]?.alternatives.b}
        >
          {questions[currentQuestionId]?.explanations.b}
        </Alert>
        <Alert
          icon={
            questions[currentQuestionId]?.user_answer === 'c' && correctAnswer === 'c'
              ? checkIcon
              : questions[currentQuestionId]?.user_answer === 'c'
                ? xIcon
                : circlelIcon
          }
          color={
            correctAnswer === 'c'
              ? 'teal'
              : questions[currentQuestionId]?.user_answer === 'c'
                ? 'red'
                : 'gray'
          }
          title={questions[currentQuestionId]?.alternatives.c}
        >
          {questions[currentQuestionId]?.explanations.c}
        </Alert>
        <Alert
          icon={
            questions[currentQuestionId]?.user_answer === 'd' && correctAnswer === 'd'
              ? checkIcon
              : questions[currentQuestionId]?.user_answer === 'd'
                ? xIcon
                : circlelIcon
          }
          color={
            correctAnswer === 'd'
              ? 'teal'
              : questions[currentQuestionId]?.user_answer === 'd'
                ? 'red'
                : 'gray'
          }
          title={questions[currentQuestionId]?.alternatives.d}
        >
          {questions[currentQuestionId]?.explanations.d}
        </Alert>
        <Group justify="center">
          <Button
            w={100}
            leftSection={<IconArrowLeft size={14} />}
            variant="outline"
            disabled={currentQuestionId === 0}
            onClick={() => setCurrentQuestionId(currentQuestionId - 1)}
          >
            Back
          </Button>
          <Button
            w={100}
            rightSection={<IconArrowRight size={14} />}
            disabled={currentQuestionId === totalOfQuestions - 1}
            onClick={() => setCurrentQuestionId(currentQuestionId + 1)}
          >
            Next
          </Button>
        </Group>
      </Stack>
    </>
  );
}
