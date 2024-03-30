'use client';

import {
  Group,
  Box,
  Image,
  Title,
} from '@mantine/core';
import classes from './Header.module.css';

export function Header() {
  return (
    <Box pb="xl">
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <a href="/" className={classes.link}>
            <Group>
              <Image src="huawei-cloud.ico" h={50} />
              <Title order={4}>Cloud Training</Title>
            </Group>
          </a>
        </Group>
      </header>
    </Box>
  );
}
