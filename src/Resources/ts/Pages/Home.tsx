import React, { useState } from "react";
import Button from "../components/Button";
import Link from "../components/Link";
import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";

export interface Journal {
  id: string;
  name: string;
  publishedDate: string;
}

export default function Home({ journals }: { journals: Journal[] }) {
  journals.sort(function (a, b) {
    if (a.publishedDate < b.publishedDate) return 1;
    if (a.publishedDate > b.publishedDate) return -1;
    return 0;
  });

  async function deleteJournal(id: string) {
    if (window.confirm("Delete ?")) {
      const res = await fetch(`/api/journals/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        window.location.reload();
      } else {
        window.alert("Delete failed.");
      }
    }
  }

  return (
    <article className="m-4 prose">
      <h1 className="text-3xl mb-4">PHP MVC + React</h1>
      <b>Journals</b>
      <Button
        className={"text-xs ml-2"}
        onClick={() => (window.location.href = "/create")}
      >
        <PlusIcon className="size-4" />
        Add New
      </Button>
      <ul>
        {journals.map((journal, index) => (
          <li key={index}>
            <a href={`/view/${journal.id}`}>
              {journal.name} (
              {journal.publishedDate &&
                new Date(journal.publishedDate).toLocaleDateString([], {
                  dateStyle: "medium",
                })}
              )
            </a>
            <Button
              title="Delete"
              className={
                "ml-2 px-0 py-0 w-6 h-6 items-center justify-center bg-transparent shadow-none border-none hover:bg-red-100"
              }
              onClick={() => deleteJournal(journal.id)}
            >
              <TrashIcon className="size-3 fill-red-600" />
            </Button>
          </li>
        ))}
      </ul>
    </article>
  );
}
