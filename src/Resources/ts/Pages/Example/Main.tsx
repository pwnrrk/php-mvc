import { PlusIcon } from "@heroicons/react/16/solid";
import Button from "../../components/Button";
import { BASE_URL } from "../../constant";

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
    <article className="p-4 mx-auto prose">
      <Button
        className={"text-xs ml-2"}
        onClick={() => (window.location.href = `${BASE_URL}/example/create`)}
      >
        <PlusIcon className="size-4" />
        New
      </Button>
      <ul>
        {journals.map((journal, index) => (
          <li key={index}>
            <a href={`${BASE_URL}/example/view/${journal.id}`}>
              {journal.name}
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}
