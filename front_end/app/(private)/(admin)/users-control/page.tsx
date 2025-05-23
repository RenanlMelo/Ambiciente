import { Users_control } from "@/app/components/admin_control/users";
import PrivateRoute from "@/app/components/auth/privateRoute";

export default function Page() {
  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <main className="w-screen min-h-screen bg-background px-5 md:px-32 py-16">
        <Users_control />
      </main>
    </PrivateRoute>
  );
}
