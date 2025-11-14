import LockedOverlay from "./LockedOverlay";
import { canAccess } from "../utils/roles";

export default function ArticleCard({ article, userRole }) {
  const accessible = canAccess(userRole, article.tier);
  const thumbStyle = { filter: accessible ? "none" : "blur(3px)", position: "relative" };

  const openArticle = () => {
    if (!accessible) return;
    // open modal with close “X” at top-right
    const evt = new CustomEvent("open-article", { detail: article });
    window.dispatchEvent(evt);
  };

  return (
    <div className="card" onClick={openArticle}>
      <div style={thumbStyle}>
        <img src={article.thumbnailUrl} alt={article.title} width="100%" />
        {!accessible && <LockedOverlay />}
      </div>
      <div className="card-body">
        <h4>{article.title}</h4>
        {article.tier === "visitor" || accessible ? <p>{article.description}</p> : <p>Upgrade to access</p>}
      </div>
    </div>
  );
}
