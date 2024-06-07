import React, { useEffect } from "react";
import { Journal } from "./Home";
import { CalendarIcon, EyeIcon } from "@heroicons/react/16/solid";

export default function Journal({ journal }: { journal: Journal }) {
  useEffect(() => {
    document.title = journal.name;
  }, []);

  return (
    <article className="prose m-4 mx-auto">
      <h1 className="text-3xl mb-4">{journal.name}</h1>
      <div className="flex gap-4">
        <div className="flex gap-1 items-center">
          <CalendarIcon className="size-4" />
          {journal.publishedDate &&
            new Date(journal.publishedDate).toLocaleDateString([], {
              dateStyle: "medium",
            })}
        </div>
        <div className="flex gap-1 items-center">
          <EyeIcon className="size-4" />
          {journal.read}
        </div>
      </div>
      <hr />
      <p className="whitespace-pre-wrap">{journal.content}</p>
    </article>
  );
}
