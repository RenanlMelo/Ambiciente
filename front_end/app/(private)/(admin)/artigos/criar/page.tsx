import { Create_article } from "@/app/components/api_articles/create_article";
import PrivateRoute from "@/app/components/auth/privateRoute";

export default function Create() {
  return (
    <>
      <PrivateRoute allowedRoles={["admin"]}>
        <Create_article />
      </PrivateRoute>
    </>
  );
}
