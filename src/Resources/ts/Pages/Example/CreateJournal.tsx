import { useForm } from "react-hook-form";
import { Journal } from "./Main";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { BASE_URL } from "../../constant";
import Textarea from "../../components/Textarea";

export default function CreateJournal() {
  const { register, handleSubmit } = useForm<Journal>();

  async function onSubmit(data: Journal) {
    const res = await fetch(`${BASE_URL}/api/journals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      window.location.href = BASE_URL + "/example";
    } else {
      window.alert("Save failed.");
    }
  }

  return (
    <article className="prose p-4 mx-auto">
      <h1>Add Journals</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Name" required {...register("name")} />
        <Textarea label="Content" required {...register("content")} />
        <Button type="submit">Submit</Button>
      </form>
    </article>
  );
}
