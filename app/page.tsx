'use client';
import { Header } from '@/components/Header/Header';
import { MockTest } from '@/components/MockTest/MockTest';
import Provider from '@/components/Provider';
import { Container } from '@mantine/core';

export default function HomePage() {
  return (
    <>
      <Provider>
        <Header />
        <Container mx="xl" size="xxs">
          <MockTest />
        </Container>
      </Provider>
    </>
  );
}
