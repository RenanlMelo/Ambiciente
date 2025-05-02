import { Create_article } from "@/app/components/api_articles/create_article";
import PrivateRoute from "@/app/components/auth/privateRoute";
import Footer from "@/app/components/ui/footer";

export default function Create() {
  return (
    <>
      <PrivateRoute allowedRoles={["admin"]}>
        <div className="">
          <Create_article />
          <Footer />
        </div>
      </PrivateRoute>
    </>
  );
}
