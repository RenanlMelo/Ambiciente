import PrivateRoute from "@/app/components/auth/privateRoute";

export default function Visualizar_denuncias() {
  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <main>
        <div>Visualização de denúncias</div>
      </main>
    </PrivateRoute>
  );
}
