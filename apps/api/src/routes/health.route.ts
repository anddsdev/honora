import createRouter from '../lib/create-router';

const router = createRouter();

router.get('/', (c) => {
  return c.text('Hello World!');
});

export default router;
