import React from 'react';

export default function SubmitButton({ children }) {
  return (
    <button type="submit" className="btn btn-primary w-100">
      {children}
    </button>
  );
}
