import React from "react";
import Button from "../components/Button";
import { PlusIcon } from "@heroicons/react/16/solid";
import { BASE_URL } from "../constant";

export interface Journal {
  id: string;
  name: string;
  publishedDate: string;
  content: string;
  read: number;
}

export default function Home({ journals }: { journals: Journal[] }) {
  journals.sort(function (a, b) {
    if (a.publishedDate < b.publishedDate) return 1;
    if (a.publishedDate > b.publishedDate) return -1;
    return 0;
  });

  return (
    <article className="m-4 mx-auto prose">
      <h1 className="text-3xl mb-4">Journals</h1>
      <Button
        className={"text-xs ml-2"}
        onClick={() => (window.location.href = `${BASE_URL}/create`)}
      >
        <PlusIcon className="size-4" />
        Add New
      </Button>
      <ul>
        {journals.map((journal, index) => (
          <li key={index}>
            <a href={`${BASE_URL}/view/${journal.id}`}>{journal.name}</a>
          </li>
        ))}
      </ul>
    </article>
  );
}
