export default function ErrorMessage({ error }: { error: string | string[] }) {
  if (typeof error !== "string") {
    return <span className="text-sm text-red-500">{error.join(",")}</span>;
  }
  return <span className="text-sm text-red-500">{error}</span>;
}
