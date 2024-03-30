import { Grid, Title, Text, RingProgress, Stack, Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useMockTestStore } from './MockTestStore';
import { Answer } from './Answer';

export function TestResults() {
  const { numberOfQuestions, questions } = useMockTestStore();
  const [currentCorrectAnswers, setCurrentCorrectAnswers] = useState(0);
  let countCorrectAnswers = 0;
  const totalOfQuestions =
    typeof numberOfQuestions === 'string' ? parseInt(numberOfQuestions) : numberOfQuestions;
  for (let question of questions) {
    if (question.user_answer === question.correct_answer) {
      countCorrectAnswers++;
    }
  }

  useEffect(() => {
    if (currentCorrectAnswers < countCorrectAnswers) {
      let intervalId = setInterval(() => {
        setCurrentCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
      }, 50);

      return () => clearInterval(intervalId);
    }
  }, [currentCorrectAnswers]);
  return (
    <Grid mt="md">
      <Grid.Col span={3}></Grid.Col>
      <Grid.Col span={6}>
        <Answer />
      </Grid.Col>
      <Grid.Col span={3}>
        <Stack align="center">
          <Title order={2}>Test Results</Title>
          <RingProgress
            rootColor="red"
            size={240}
            thickness={30}
            label={
              <Text fw={700} ta="center" size="xl">
                {currentCorrectAnswers}/{totalOfQuestions}
              </Text>
            }
            sections={[{ value: (countCorrectAnswers * 100) / totalOfQuestions, color: 'teal' }]}
          />
          <Button component="a" href="/">Start New Test</Button>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
