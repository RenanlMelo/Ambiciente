"use client";

import PrivateRoute from "@/app/components/auth/privateRoute";
import { Users_info } from "@/app/components/user/users_info";
import { Users_reports } from "@/app/components/user/users_reports";
import React from "react";

export default function Perfil() {
  return (
    <PrivateRoute allowedRoles={["user"]}>
      <div className="w-full min-h-screen bg-white px-5 md:px-32 py-16">
        <Users_info />
        <h3 className="text-clamp-large text-darkGrey font-semibold mt-12 mb-4">
          Minhas Denúncias
        </h3>
        <Users_reports />
      </div>
    </PrivateRoute>
  );
}
