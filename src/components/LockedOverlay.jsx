export default function LockedOverlay() {
  return (
    <div className="lock-overlay" style={{
      position:"absolute", top:0, left:0, right:0, bottom:0,
      display:"flex", alignItems:"center", justifyContent:"center",
      color:"#fff", background:"rgba(0,0,0,0.25)"
    }}>
      🔒 Locked
    </div>
  );
}
