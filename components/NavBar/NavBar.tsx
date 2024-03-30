import {
  Group,
  ScrollArea,
  Title,
  Image,
} from '@mantine/core';
import {
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconCloud,
  IconCloudComputing,
  IconCloudDataConnection,
  IconCloudNetwork,
  IconCloudLock,
  IconCloudCog,
} from '@tabler/icons-react';
import classes from './NavBar.module.css';
import { LinkGroup } from './LinkGroup';

const linksData = [
  { label: 'Cloud Basics', IconComponent: IconCloud },
  { label: 'Compute Cloud Services', IconComponent: IconCloudComputing },
  { label: 'Network Cloud Services', IconComponent: IconCloudNetwork },
  { label: 'Storage Cloud Services', IconComponent: IconCloudDataConnection },
  { label: 'HUAWEI CLOUD O&M Basics', IconComponent: IconCloudLock },
  { label: 'Database, Security, and other Services', IconComponent: IconCloudCog },
];

export function NavBar() {
  const links = linksData.map((item) => <LinkGroup key={item.label} label={item.label} IconComponent={item.IconComponent} />);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <a href="/" className={classes.link}>
            <Group>
              <Image src="huawei-cloud.ico" h={40} />
              <Title order={5}>Huawei Cloud Training</Title>
            </Group>
          </a>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>
          {links}
        </div>
      </ScrollArea>
    </nav>
  );
}
