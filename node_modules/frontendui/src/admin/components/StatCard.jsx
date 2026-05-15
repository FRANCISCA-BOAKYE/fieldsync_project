export default function StatCard({ title, value }) {
  return (
    <article>
      <strong>{value}</strong>
      <span>{title}</span>
    </article>
  );
}
