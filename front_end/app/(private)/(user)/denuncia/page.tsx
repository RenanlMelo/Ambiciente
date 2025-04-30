import { Denuncia_forms } from "@/app/components/report/forms_report";
import Footer from "@/app/components/ui/footer";
import PrivateRoute from "@/app/components/auth/privateRoute";

export default function Denuncia() {
  return (
    <>
      <PrivateRoute allowedRoles={["user", "staff", "admin"]}>
        <Denuncia_forms />
        <Footer />
      </PrivateRoute>
    </>
  );
}
