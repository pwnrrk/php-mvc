import React, { FormEvent, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Link from "../components/Link";
import { useForm } from "react-hook-form";
import Checkbox from "../components/Checkbox";

interface Journal {
  name: string;
  publishedYear: string;
}

export default function Home({ journals }: { journals: Journal[] }) {
  const [data, setData] = useState<Journal[]>(journals);
  const { register, handleSubmit, reset } = useForm<Journal>();

  data.sort(function (a, b) {
    if (a.publishedYear < b.publishedYear) return 1;
    if (a.publishedYear > b.publishedYear) return -1;
    return 0;
  });

  function onSubmit(data: Journal) {
    setData((old) => {
      return [...old, data];
    });
    reset();
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
                <Link href={`/view/${index}`}>
                  {journal.name} (
                  {journal.publishedYear &&
                    new Date(journal.publishedYear).toLocaleDateString([], {
                      year: "numeric",
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
            {...register("publishedYear")}
          />
          <Checkbox label="Keep the form open" />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}
