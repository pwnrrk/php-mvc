import React from "react";
import { useForm } from "react-hook-form";
import { Journal } from "./Home";
import Input from "../components/Input";
import Button from "../components/Button";

export default function CreateJournal() {
  const { register, handleSubmit } = useForm<Journal>();

  async function onSubmit(data: Journal) {
    const res = await fetch("api/journals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      window.location.href = "";
    } else {
      window.alert("Save failed.");
    }
  }

  return (
    <div className="m-4">
      <article className="prose">
        <h1>Add Journals</h1>
      </article>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Name" required {...register("name")} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
