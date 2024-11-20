import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login'; // Adjust path if necessary

// Mock fetch function for all tests to simulate network requests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: false,
    json: () => Promise.resolve({ message: 'Login failed.' }), // Mock failed login response
  })
);

// Clear all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});

// Test that the login form renders all necessary fields and button
test('renders the login form with email and password fields and a submit button', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  expect(screen.getByPlaceholderText(/^email$/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

// Test that user input is handled correctly in form fields
test('allows the user to type in the fields', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/^email$/i), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText(/^password$/i), {
    target: { value: 'mypassword' },
  });

  expect(screen.getByPlaceholderText(/^email$/i).value).toBe('test@example.com');
  expect(screen.getByPlaceholderText(/^password$/i).value).toBe('mypassword');
});

// Test that an error message displays when login fails
test('displays an error message on failed login', async () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/^email$/i), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText(/^password$/i), {
    target: { value: 'wrongpassword' },
  });

  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  // Verify that the error message from the mock response is displayed
  const errorMessage = await screen.findByText(/login failed/i);
  expect(errorMessage).toBeInTheDocument();
});
