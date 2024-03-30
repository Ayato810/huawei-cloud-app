import { Chip, Group, NumberInput, Title } from '@mantine/core';
import { useMockTestStore } from './MockTestStore';

export function TestSettings() {
  const { topics, toggleTopic, numberOfQuestions, setNumberOfQuestions, time, setTime } =
    useMockTestStore();

  return (
    <>
      <Title order={5}>Test Topics</Title>
      <Group justify="center">
        {topics.map((topic) => (
          <Chip
            key={topic.name}
            checked={topic.checked}
            variant="light"
            onChange={() => toggleTopic(topic.name)}
          >
            {topic.name}
          </Chip>
        ))}
      </Group>
      <Group justify="center">
        <NumberInput
          label="N° of questions"
          min={1}
          clampBehavior="strict"
          value={numberOfQuestions}
          onChange={setNumberOfQuestions}
        />
        <NumberInput
          label="Duration"
          min={1}
          clampBehavior="strict"
          suffix=" min"
          value={time}
          onChange={setTime}
        />
      </Group>
    </>
  );
}
