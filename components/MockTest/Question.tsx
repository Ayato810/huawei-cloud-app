import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
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
  ActionIcon,
} from '@mantine/core';
import Timer from './Timer';
import { useMockTestStore } from './MockTestStore';
import { useEffect, useState } from 'react';
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconHeart,
  IconReload,
  IconSend,
  IconX,
} from '@tabler/icons-react';
import { useDisclosure, useListState } from '@mantine/hooks';
import { getEnabledCategories } from 'trace_events';

export function Question({ nextStep }: { nextStep: () => void }) {
  const {
    questions,
    time,
    addQuestion,
    totalNumberOfQuestions,
    updateUserAnswer,
    topics,
    addQuestionAtIndex,
  } = useMockTestStore();
  const [questionId, setQuestionId] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);
  const [refresh, setRefresh] = useState(false);
  const totalOfQuestions =
    typeof totalNumberOfQuestions === 'string'
      ? parseInt(totalNumberOfQuestions)
      : totalNumberOfQuestions;
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const getCurrentTopicEndpoint = (currentId: number) => {
    let totalQuestionsSoFar = 0;
    for (const topic of topics) {
      const { numberOfQuestions } = topic;
      const nextTotal = totalQuestionsSoFar + Number(numberOfQuestions);
      if (currentId < nextTotal) {
        return topic.endpoint;
      }
      totalQuestionsSoFar = nextTotal;
    }
    return topics[0].endpoint;
  };

  const testId = totalNumberOfQuestions + '-' + Math.random().toString(36).substring(7);

  /*   const queries = useQueries({
    queries: topics.flatMap((topic) =>
      Array.from({ length: topic.numberOfQuestions }, (_, index) => ({
        queryKey: ['question', topic.endpoint, index],
        queryFn: () => getQuestion(testId, topic.endpoint),
      }))
    ),
  }); */
  const [enabledQueries, handlers] = useListState<boolean>(Array(+totalNumberOfQuestions).fill(false));

  let queryIndex = 0; // contador externo para el índice individual

  const queriesArray = topics.flatMap((topic) =>
    Array.from({ length: topic.numberOfQuestions }, (_, index) => {
      const queryObj = {
        queryKey: ['question', topic.endpoint, index],
        queryFn: () => getQuestion(testId, topic.endpoint),
        enabled: queryIndex === 0 ? true : enabledQueries[queryIndex],
        staleTime: Infinity,
      };
      queryIndex++; // incrementar el contador externo
      return queryObj;
    })
  );

  const queries = queriesArray.map((query) => useQuery(query));

  useEffect(() => {
    const currentQuery = queries[questionId];
    if (currentQuery && currentQuery.isSuccess) {
      handlers.setItem(questionId + 1, true);
      const data = currentQuery.data;
      data.id = questionId;
      addQuestion(data as Question);
      setQuestionId(questionId + 1);
    }
  }, [queries[questionId]?.isSuccess]);

  /*   const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ['reload-question'],
    queryFn: () => getQuestion(getCurrentTopicEndpoint(currentQuestionId)),
    staleTime: Infinity,
    enabled: !refresh,
  });

  useEffect(() => {
    if (isSuccess) {
      const updatedQuestion = data as Question;
      addQuestionAtIndex(updatedQuestion, currentQuestionId);
    }
  }, [isSuccess]);
 */

  const timeInMinutes = typeof time === 'string' ? parseInt(time) : time;

  const correctAnswer = questions[currentQuestionId]?.correct_answer;
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  /*   const refreshQuestion = () => {
    //queries[currentQuestionId].refetch({ cancelRefetch: true });
    refetch();
    setRefresh(true);
  }; */

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
          <Button w={75} variant="outline" onClick={close}>
            No
          </Button>
          <Button w={75} color="red" variant="outline" onClick={nextStep}>
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
            <Group justify="space-between">
              <Title order={4} c="blue">
                Question {currentQuestionId + 1} of {totalNumberOfQuestions}
              </Title>
              {/* <ActionIcon
                variant="gradient"
                size="xl"
                aria-label="Gradient action icon"
                gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                onClick={refreshQuestion}
              >
                <IconReload style={{ width: rem(20), height: rem(20) }} />
              </ActionIcon> */}
            </Group>

            <Progress value={(currentQuestionId + 1) * (100 / +totalNumberOfQuestions)} size="lg" />
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
            <Accordion key={'answers' + currentQuestionId} variant="separated">
              {answers}
            </Accordion>
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
