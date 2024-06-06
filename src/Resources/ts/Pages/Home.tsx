import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Link from "../components/Link";
import { useForm } from "react-hook-form";

export interface Journal {
  id: string;
  name: string;
  publishedDate: string;
}

export default function Home({ journals }: { journals: Journal[] }) {
  const [data, setData] = useState<Journal[]>(journals);
  const { register, handleSubmit, reset } = useForm<Journal>();

  data.sort(function (a, b) {
    if (a.publishedDate < b.publishedDate) return 1;
    if (a.publishedDate > b.publishedDate) return -1;
    return 0;
  });

  async function onSubmit(data: Journal) {
    const res = await fetch("/api/journals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const body =
      res.headers.get("Content-Type") === "application/json"
        ? await res.json()
        : await res.text();

    if (res.ok) {
      setData((old) => {
        return [...old, data];
      });
      reset();
    } else {
      window.alert("Save failed.");
    }

    console.log(body);
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
                <Link href={`/view/${journal.id}`}>
                  {journal.name} (
                  {journal.publishedDate &&
                    new Date(journal.publishedDate).toLocaleDateString([], {
                      dateStyle: "medium",
                    })}
                  )
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <b>Add Journals</b>
          <Input label="Name" required {...register("name")} />
          <Input
            label="Year"
            required
            type="date"
            {...register("publishedDate")}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}
