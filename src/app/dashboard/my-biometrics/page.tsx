import BuiometricsForm from "@/src/components/biometrics/BiometricsForm";
import DashboardNav from "@/src/components/elements/DashboardNav";
import { headers } from "next/headers";
import React from "react";

export default async function MyBiometrics() {
  const getBiometrics = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/biometrics`,
    {
      method: "GET",
      headers: await headers(),
    }
  ).then((res) => res.json());

  console.log(getBiometrics);

  // const biometrics = await getBiometrics.json();
  // console.log(biometrics);
  return (
    <>
      <DashboardNav title="Biometrics" />

      <div>
        <BuiometricsForm />
      </div>
    </>
  );
}
