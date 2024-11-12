/**
 * @file Signup.test.js
 * @description Unit tests for the Signup component using React Testing Library.
 *              Tests include form field rendering, input behavior, and error message display on failed sign-up attempts.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Signup from '../pages/Signup';    // Import Signup component; adjust path if necessary

// Mock fetch function for all tests to simulate network requests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: false,
    json: () => Promise.resolve({ message: 'Sign up failed.' }), // Mock failed sign-up response
  })
);

// Clear all mocks after each test to prevent shared state issues
afterEach(() => {
  jest.clearAllMocks();
});

// Test that the sign-up form renders all necessary fields and button
test('renders the sign-up form with name, username, email, and password fields and a submit button', () => {
  // Render Signup component within a MemoryRouter to handle routing
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  // Verify the presence of input fields and submit button on the form
  expect(screen.getByPlaceholderText(/^name$/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/^username$/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/^email$/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
});

// Test that user input is handled correctly in form fields
test('allows the user to type in the fields', () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  // Simulate user typing into each form field
  fireEvent.change(screen.getByPlaceholderText(/^name$/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByPlaceholderText(/^username$/i), { target: { value: 'johndoe' } });
  fireEvent.change(screen.getByPlaceholderText(/^email$/i), { target: { value: 'johndoe@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/^password$/i), { target: { value: 'password123' } });

  // Verify that the input fields reflect the typed values
  expect(screen.getByPlaceholderText(/^name$/i).value).toBe('John Doe');
  expect(screen.getByPlaceholderText(/^username$/i).value).toBe('johndoe');
  expect(screen.getByPlaceholderText(/^email$/i).value).toBe('johndoe@example.com');
  expect(screen.getByPlaceholderText(/^password$/i).value).toBe('password123');
});

// Test that an error message displays when sign-up fails
test('displays an error message on failed sign-up', async () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );

  // Simulate user typing into each form field
  fireEvent.change(screen.getByPlaceholderText(/^name$/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByPlaceholderText(/^username$/i), { target: { value: 'johndoe' } });
  fireEvent.change(screen.getByPlaceholderText(/^email$/i), { target: { value: 'johndoe@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/^password$/i), { target: { value: 'password123' } });

  // Simulate clicking the "Sign Up" button
  fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

  // Verify that the error message from the mock response is displayed
  const errorMessage = await screen.findByText(/sign up failed|an error occurred/i);
  expect(errorMessage).toBeInTheDocument();
});
