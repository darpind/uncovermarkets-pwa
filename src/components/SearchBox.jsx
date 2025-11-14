export default function SearchBox({ value, onChange }) {
  return (
    <input
      type="search"
      placeholder="Search articles..."
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ width:"100%", padding:"10px", border:"1px solid #ddd", borderRadius:"6px" }}
    />
  );
}
