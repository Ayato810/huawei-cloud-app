import React from 'react';
import { Box, ThemeIcon, Group, UnstyledButton, rem } from '@mantine/core';
import classes from './NavBar.module.css';
import { IconProps } from '@tabler/icons-react';

interface LinkGroupProps {
    label: string;
    IconComponent: React.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  }

export function LinkGroup({ label, IconComponent }: LinkGroupProps) {
  return (
    <UnstyledButton className={classes.control}>
      <Group justify="space-between" gap={0}>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <ThemeIcon variant="light" size={30}>
            <IconComponent style={{ width: rem(18), height: rem(18) }} />
          </ThemeIcon>
          <Box ml="md">{label}</Box>
        </Box>
      </Group>
    </UnstyledButton>
  );
}
