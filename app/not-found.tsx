import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-heading font-bold text-primary-500 mb-4">404</p>
        <h2 className="text-2xl font-heading font-bold text-foreground-primary mb-3">
          Page Not Found
        </h2>
        <p className="text-foreground-secondary mb-6">
          The page you are looking for does not exist. Let us guide you back to learning about Indian democracy.
        </p>
        <Link href="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
