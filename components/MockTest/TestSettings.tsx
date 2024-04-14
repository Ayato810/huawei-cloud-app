import { Chip, Fieldset, Flex, Group, NumberInput, Title } from '@mantine/core';
import { useMockTestStore } from './MockTestStore';
import { useEffect } from 'react';

export function TestSettings() {
  const { topics, time, setTime, totalNumberOfQuestions, setTotalNumberOfQuestions, setTopicNumberOfQuestions } =
    useMockTestStore();
  useEffect(() => {
    setTotalNumberOfQuestions(topics.reduce((acc, topic) => acc + (+topic.numberOfQuestions), 0))
  }, [topics])
  return (
    <>
      <Fieldset legend="N° of Questions">
      <Group justify="center" wrap="wrap">
        {topics.map((topic) => (
          <NumberInput
            w={300}
            key={topic.name}
            label={topic.name}
            value={topic.numberOfQuestions}
            onChange={(value) => setTopicNumberOfQuestions(topics.indexOf(topic), +value)}
            min={0}
          />
        ))}
      </Group>
      </Fieldset>
      <Group>
        <NumberInput
          w={300}
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
