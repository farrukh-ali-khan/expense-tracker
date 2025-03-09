// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Expense Tracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
