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
} from '@mantine/core';
import Timer from './Timer';
import { useMockTestStore } from './MockTestStore';
import { useEffect, useState } from 'react';
import { IconArrowLeft, IconArrowRight, IconCheck, IconSend, IconX } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

export function Question( { nextStep }: { nextStep: () => void }) {
  const { questions, time, addQuestion, numberOfQuestions, updateUserAnswer } = useMockTestStore();
  const [questionId, setQuestionId] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);
  const totalOfQuestions =
    typeof numberOfQuestions === 'string' ? parseInt(numberOfQuestions) : numberOfQuestions;
  const queries = useQueries({
    queries: Array.from({ length: totalOfQuestions }, (_, index) => ({
      queryKey: ['question', index],
      queryFn: getQuestion,
      staleTime: Infinity,
    })),
  });
  useEffect(() => {
    const currentQuery = queries[questionId];
    if (currentQuery && currentQuery.isSuccess) {
      const data = currentQuery.data;
      data.id = questionId;
      addQuestion(data as Question);
      setQuestionId(questionId + 1);
    }
  }, [queries]);
  const timeInMinutes = typeof time === 'string' ? parseInt(time) : time;

  const [currentQuestionId, setCurrentQuestionId] = useState(0);

  const correctAnswer = questions[currentQuestionId]?.correct_answer;
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  const explanations = (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Are you sure you want to finish the test?"
        centered
        transitionProps={{ transition: 'fade', duration: 1500 }}
      >
        <Group justify="center">
          <Button
            w={75}
            variant="outline"
            disabled={currentQuestionId === 0}
            onClick={close}
          >
            No
          </Button>
          <Button w={75} color='red' variant='outline' onClick={nextStep}>
            Yes
          </Button>
        </Group>
      </Modal>
      <Notification
        mb="sm"
        withBorder
        withCloseButton={false}
        icon={correctAnswer === 'a' ? checkIcon : xIcon}
        color={correctAnswer === 'a' ? 'teal' : 'red'}
        title={questions[currentQuestionId]?.alternatives.a}
      >
        {questions[currentQuestionId]?.explanations.a}
      </Notification>
      <Notification
        mb="sm"
        withBorder
        withCloseButton={false}
        icon={correctAnswer === 'b' ? checkIcon : xIcon}
        color={correctAnswer === 'b' ? 'teal' : 'red'}
        title={questions[currentQuestionId]?.alternatives.b}
      >
        {questions[currentQuestionId]?.explanations.b}
      </Notification>
      <Notification
        mb="sm"
        withBorder
        withCloseButton={false}
        icon={correctAnswer === 'c' ? checkIcon : xIcon}
        color={correctAnswer === 'c' ? 'teal' : 'red'}
        title={questions[currentQuestionId]?.alternatives.c}
      >
        {questions[currentQuestionId]?.explanations.c}
      </Notification>
      <Notification
        withBorder
        withCloseButton={false}
        icon={correctAnswer === 'd' ? checkIcon : xIcon}
        color={correctAnswer === 'd' ? 'teal' : 'red'}
        title={questions[currentQuestionId]?.alternatives.d}
      >
        {questions[currentQuestionId]?.explanations.d}
      </Notification>
    </>
  );

  const answers = (
    <Accordion.Item value={'Check correct answer'}>
      <Accordion.Control icon={'🗸'}>{'Check correct answer'}</Accordion.Control>
      <Accordion.Panel>{explanations}</Accordion.Panel>
    </Accordion.Item>
  );
  return (
    <Grid mt="md">
      <Grid.Col span={3}></Grid.Col>
      <Grid.Col span={6}>
        <Skeleton visible={queries[currentQuestionId].isLoading}>
          <Stack>
            <Title order={4} c="blue">
              Question {currentQuestionId + 1} of {numberOfQuestions}
            </Title>
            <Progress
              value={currentQuestionId + 1}
              size="lg"
              transitionDuration={totalOfQuestions}
            />
            <Radio.Group
              key={currentQuestionId}
              value={questions[currentQuestionId]?.user_answer}
              onChange={(value) => {
                updateUserAnswer(currentQuestionId, value);
              }}
              name="question"
              label={questions[currentQuestionId]?.statement}
            >
              <Radio
                icon={CheckIcon}
                mt="sm"
                value="a"
                label={questions[currentQuestionId]?.alternatives.a}
              />
              <Radio
                icon={CheckIcon}
                mt="sm"
                value="b"
                label={questions[currentQuestionId]?.alternatives.b}
              />
              <Radio
                icon={CheckIcon}
                mt="sm"
                value="c"
                label={questions[currentQuestionId]?.alternatives.c}
              />
              <Radio
                icon={CheckIcon}
                mt="sm"
                value="d"
                label={questions[currentQuestionId]?.alternatives.d}
              />
            </Radio.Group>
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
              {currentQuestionId === totalOfQuestions - 1 ? (
                <Button w={100} color="red" rightSection={<IconSend size={14} />} onClick={open}>
                  Finish
                </Button>
              ) : (
                <Button
                  w={100}
                  rightSection={<IconArrowRight size={14} />}
                  onClick={() => setCurrentQuestionId(currentQuestionId + 1)}
                >
                  Next
                </Button>
              )}
            </Group>
            <Accordion variant="separated">{answers}</Accordion>
          </Stack>
        </Skeleton>
      </Grid.Col>
      <Grid.Col span={3}>
        <Stack justify="center" align="center">
          <Timer minutes={timeInMinutes} isPaused={queries[currentQuestionId].isLoading} />
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
