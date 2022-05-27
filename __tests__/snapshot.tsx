import { act, render } from '@testing-library/react'
import Home from '@/pages/index'
import { QueryClient, QueryClientProvider } from 'react-query';

it('renders homepage unchanged', async () => {
  const queryClient = new QueryClient();
  // @ts-ignore
  const {container} = await act(async () => render(
    <QueryClientProvider client={queryClient}>
      <Home/>
    </QueryClientProvider>
  ));

  expect(container).toMatchSnapshot()
})
