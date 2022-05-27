import { act, render, screen } from '@testing-library/react'
import Home from '@/pages/index'
import { QueryClient, QueryClientProvider } from 'react-query';

describe('Home', () => {
  it('renders a heading', async () => {
    const queryClient = new QueryClient();
    // @ts-ignore
    await act(async () => render(
      <QueryClientProvider client={queryClient}>
        <Home/>
      </QueryClientProvider>
    ));

    const heading = screen.getByRole('heading', {
      name: /Welcome to BlogPost!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
