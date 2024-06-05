import React, { FormEvent, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Home({
  journals,
}: {
  journals: Record<string, any>[];
}) {
  const [data, setData] = useState(journals);

  data.sort(function (a, b) {
    if (a.publishedYear < b.publishedYear) return 1;
    if (a.publishedYear > b.publishedYear) return -1;
    return 0;
  });

  function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setData((old) => {
      return [
        ...old,
        {
          name: ev.target["name"]?.value,
          publishedYear: ev.target["publishedYear"]?.value,
        },
      ];
    });
    ev.currentTarget.reset();
    ev.target["name"]?.focus();
  }

  return (
    <div className="w-full max-w-xl m-auto">
      <div className="shadow border p-4 rounded mt-4">
        <h1 className="text-3xl mb-4">Hello world React + PHP</h1>
        <div className="mb-2">
          <b>Journals</b>
          <ul>
            {data.map((journal, index) => (
              <li key={index}>
                {journal.name} (
                {journal.publishedYear &&
                  new Date(journal.publishedYear).toLocaleDateString([], {
                    year: "numeric",
                  })}
                )
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <b>Add Journals</b>
          <Input label="Name" name="name" required />
          <Input label="Year" name="publishedYear" required type="date" />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}
