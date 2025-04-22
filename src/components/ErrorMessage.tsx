export default function ErrorMessage({ error }: { error: string }) {
  return <span className="text-sm text-red-500">{error}</span>;
}
