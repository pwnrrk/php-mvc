import React, { useEffect } from "react";

export default function Journal({
  journal,
}: {
  journal: { name: string; publishedYear: string };
}) {
  useEffect(() => {
    document.title = journal.name;
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl mb-4">{journal.name}</h1>
      <b className="text-black/60">{journal.publishedYear}</b>
    </div>
  );
}
