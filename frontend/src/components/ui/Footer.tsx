export default function Footer() {
  return (
    <footer className="h-12 flex items-center justify-center text-xs text-gray-500 bg-slate-100 border-t">
      © {new Date().getFullYear()} PatientPortal · All rights reserved
    </footer>
  );
}
