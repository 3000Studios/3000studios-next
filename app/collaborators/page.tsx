"use client";
// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import { useState, useEffect } from "react";
import AddCollaborator from "@/components/AddCollaborator";
import CollaboratorList from "@/components/CollaboratorList";
import { Collaborator } from "@/types";

export default function CollaboratorsPage() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRemoving, setIsRemoving] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCollaborators();
  }, []);

  const fetchCollaborators = async () => {
    try {
      const response = await fetch("/api/collaborators");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch collaborators");
      }

      setCollaborators(data.collaborators);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = (collaborator: Collaborator) => {
    setCollaborators((prev) => [...prev, collaborator]);
  };

  const handleRemove = async (id: number) => {
    setIsRemoving(id);
    try {
      const response = await fetch(`/api/collaborators?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to remove collaborator");
      }

      setCollaborators((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsRemoving(null);
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 md:py-20 bg-gradient-to-br from-black via-purple-950 to-black w-full max-w-full overflow-x-hidden">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-3 md:mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Collaborators
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Manage your project team members
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-xl text-red-300 text-center">
            {error}
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          <AddCollaborator onAdd={handleAdd} />

          {isLoading ? (
            <div className="glass p-6 rounded-2xl text-center">
              <div className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-400">Loading collaborators...</p>
            </div>
          ) : (
            <CollaboratorList
              collaborators={collaborators}
              onRemove={handleRemove}
              isRemoving={isRemoving}
            />
          )}
        </div>
      </div>
    </div>
  );
}
