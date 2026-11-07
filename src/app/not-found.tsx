import Link from "next/link";
import { LogoMark } from "@/components/site/Logo";

export default function NotFound() {
  return (
    <div className="shell notfound">
      <LogoMark size={56} />
      <p className="notfound-code">404</p>
      <h1 style={{ fontSize: "1.6rem" }}>পাতাটি খুঁজে পাওয়া গেল না</h1>
      <p className="muted">লিংকটি ভুল হতে পারে অথবা পাতাটি সরানো হয়েছে।</p>
      <Link href="/" className="btn btn-primary">
        হোমে ফিরে যাও
      </Link>
    </div>
  );
}
