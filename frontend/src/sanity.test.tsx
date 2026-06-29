import { render, screen } from '@testing-library/react'

describe('sanity check', () => {
  it('runs the test runner', () => {
    expect(1 + 1).toBe(2)
  })

  it('can render and query the DOM', () => {
    render(<h1>Savora</h1>)
    expect(screen.getByText('Savora')).toBeInTheDocument()
  })
})
