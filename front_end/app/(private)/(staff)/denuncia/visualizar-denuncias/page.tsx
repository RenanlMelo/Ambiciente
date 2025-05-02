import PrivateRoute from "@/app/components/auth/privateRoute";
import { All_reports } from "@/app/components/report/all_reports";


export default function Visualizar_denuncias() {

  
  return (
    <PrivateRoute allowedRoles={["staff", "admin"]}>
      <All_reports />
    </PrivateRoute>
  );
}
