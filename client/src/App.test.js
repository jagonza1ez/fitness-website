import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Signup from './pages/Signup'; // Adjust path as necessary

// Mock fetch for the test environment
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: false,
    json: () => Promise.resolve({ message: 'Sign up failed.' }),
  })
);

afterEach(() => {
  jest.clearAllMocks();
});

test('renders the sign-up form with name, username, email, and password fields and a submit button', () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  expect(screen.getByPlaceholderText(/^name$/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/^username$/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/^email$/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
});

test('allows the user to type in the fields', () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/^name$/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByPlaceholderText(/^username$/i), { target: { value: 'johndoe' } });
  fireEvent.change(screen.getByPlaceholderText(/^email$/i), { target: { value: 'johndoe@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/^password$/i), { target: { value: 'password123' } });

  expect(screen.getByPlaceholderText(/^name$/i).value).toBe('John Doe');
  expect(screen.getByPlaceholderText(/^username$/i).value).toBe('johndoe');
  expect(screen.getByPlaceholderText(/^email$/i).value).toBe('johndoe@example.com');
  expect(screen.getByPlaceholderText(/^password$/i).value).toBe('password123');
});

test('displays an error message on failed sign-up', async () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/^name$/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByPlaceholderText(/^username$/i), { target: { value: 'johndoe' } });
  fireEvent.change(screen.getByPlaceholderText(/^email$/i), { target: { value: 'johndoe@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/^password$/i), { target: { value: 'password123' } });

  fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

  // Check for the error message based on mock response
  const errorMessage = await screen.findByText(/sign up failed|an error occurred/i);
  expect(errorMessage).toBeInTheDocument();
});
