import { Edit_article } from "@/app/components/api_articles/edit_article";
import PrivateRoute from "@/app/components/auth/privateRoute";
import Footer from "@/app/components/ui/footer";

export default function Edit() {
  return (
    <>
      <PrivateRoute allowedRoles={["admin"]}>
        <div className="block">
          <Edit_article />
        </div>
      </PrivateRoute>
    </>
  );
}
