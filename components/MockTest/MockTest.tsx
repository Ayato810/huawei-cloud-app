import { Button, Container, Group, Skeleton, Stack, Stepper } from '@mantine/core';
import { useState } from 'react';
import { TestSettings } from './TestSettings';
import { IconPencil } from '@tabler/icons-react';
import { Question } from './Question';
import { TestResults } from './TestResults';

export function MockTest() {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current: number) => (current < 3 ? current + 1 : current));
  return (
    <>
      <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
        <Stepper.Step
          label="Configuration"
          description="Fill in test settings"
          allowStepClick={false}
          allowStepSelect={false}
        >
          <Container size="sm">
            <Stack my="md" align="center" justify="center">
              <TestSettings />
              <Button onClick={nextStep} mt="md" rightSection={<IconPencil size={14} />}>
                Start Mock Test
              </Button>
            </Stack>
          </Container>
        </Stepper.Step>
        <Stepper.Step
          label="Mock Test"
          description="Answer the questions"
          allowStepClick={false}
          allowStepSelect={false}
        >
          <Question nextStep={nextStep} />
        </Stepper.Step>
        <Stepper.Step
          label="Results"
          description="Check final score"
          allowStepClick={false}
          allowStepSelect={false}
        >
          <TestResults />
        </Stepper.Step>
        <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
      </Stepper>
    </>
  );
}
