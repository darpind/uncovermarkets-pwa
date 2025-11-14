import ManageArticles from "./ManageArticles";
import ManageMarketUpdates from "./ManageMarketUpdates";
import ManageUsers from "./ManageUsers";
import ManageFlash from "./ManageFlash";
import ManageBrand from "./ManageBrand";

export default function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ManageBrand />
      <ManageFlash />
      <ManageArticles />
      <ManageMarketUpdates />
      <ManageUsers />
    </div>
  );
}
