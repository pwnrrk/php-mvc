import React, { useEffect } from "react";
import { Journal } from "./Home";

export default function Journal({ journal }: { journal: Journal }) {
  useEffect(() => {
    document.title = journal.name;
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl mb-4">{journal.name}</h1>
      <b className="text-black/60">
        {journal.publishedDate &&
          new Date(journal.publishedDate).toLocaleDateString([], {
            dateStyle: "medium",
          })}
      </b>
    </div>
  );
}
