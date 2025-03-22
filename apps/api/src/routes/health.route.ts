import createRouter from '@/api/lib/create-router';

const router = createRouter();

router.get('/health', (c) => {
  return c.text('Hello World!');
});

export default router;
