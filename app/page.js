// app/page.jsx
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/universities"); // automatically goes to /login
}
