// Remove Clerk middleware since we're using NextAuth.js
export default function middleware() {
  return null;
}