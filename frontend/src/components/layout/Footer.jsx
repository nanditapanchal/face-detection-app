import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-3 mt-4">
      © {new Date().getFullYear()} Face Detection App. All rights reserved.
    </footer>
  );
}
