import { Edit_article } from "@/app/components/api_articles/edit_article";
import PrivateRoute from "@/app/components/auth/privateRoute";

export default function Edit() {
  return (
    <>
      <PrivateRoute allowedRoles={["admin"]}>
        <Edit_article />
      </PrivateRoute>
    </>
  );
}
