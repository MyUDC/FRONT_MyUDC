"use client";

// src\app\(auth)\(no-app-bar)\user\interests\page.tsx
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import interests from "@/features/user/data/interests";
import InterestCard from "@/shared/components/InterestCard";
import Tabs from "@/shared/components/Tabs";

export default function Favorites() {
  const [activeTab, setActiveTab] = useState("licenciaturas");

  const tabs = [
    { label: "Licenciaturas", value: "licenciaturas" },
    { label: "Todo", value: "todo" },
    { label: "Ingenierías", value: "ingenierias" },
  ];

  // Filtrar los intereses según la tab activa
  const filteredInterests = interests.filter((interest) => {
    if (activeTab === "todo") return true;
    if (activeTab === "licenciaturas")
      return interest.title.includes("Licenciatura");
    if (activeTab === "ingenierias")
      return interest.title.includes("Ingeniería");
    return false;
  });

  return (
    <div className="h-screen bg-gray-100">
      <div className="bg-white p-4">
        {/* Botón de regresar */}
        <Link href="/home">
          <IoArrowBack className="text-green text-3xl cursor-pointer mb-4" />
        </Link>

        <h1 className="text-2xl font-bold text-black mb-4">Favoritos</h1>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {/* Contenido de la página */}
        {filteredInterests.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-2">
            {filteredInterests.map((interest, index) => (
              <InterestCard key={index} {...interest} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-full py-8">
            <p className="text-gray-500 text-lg">
              No tienes favoritos agregados aún.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
