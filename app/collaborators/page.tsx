"use client";
// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

import { useState, useEffect } from "react";
import AddCollaborator from "@/components/AddCollaborator";

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
  
  useEffect(() => {
    fetch("/api/collaborators")
      .then((res) => res.json())
      .then((data) => setCollaborators(data))
      .catch(() => {});
  }, []);








  return (
    <div className="min-h-screen p-8 text-white">
      <h1 className="text-4xl font-bold mb-6">Manage Collaborators</h1>
      <AddCollaborator onAdd={setCollaborators} />
      <CollaboratorList collaborators={collaborators} />
    </div>
  );
}
