import {
  CalendarIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Dialog from "../components/Dialog";
import Dropdown from "../components/Dropdown";
import { BASE_URL } from "../constant";
import { Journal } from "./Home";

export default function Journal({ journal }: { journal: Journal }) {
  const [isDelete, setDelete] = useState(false);

  useEffect(() => {
    document.title = journal.name;
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/api/journals/${journal.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        read: journal.read + 1,
      }),
    });
  }, [journal.id]);

  async function deleteJournal() {
    const res = await fetch(`${BASE_URL}/api/journals/${journal.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      window.location.href = BASE_URL || "/";
    } else {
      window.alert("Delete failed.");
    }
  }

  return (
    <article className="prose p-4 mx-auto">
      <h1 className="text-3xl mb-4">{journal.name}</h1>
      <div className="flex gap-4">
        <div className="flex flex-1 gap-4">
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
        <Dropdown
          buttonProps={{
            startIcon: <EllipsisHorizontalIcon className="size-4 fill-black" />,
            className:
              "bg-transparent text-inherit border-none shadow-none data-[hover]:bg-black/5",
          }}
          items={[
            {
              label: "Edit",
              disabled: true,
              icon: <PencilSquareIcon className="size-4" />,
            },
            {
              label: "Delete",
              icon: <TrashIcon className="size-4" />,
              buttonProps: {
                onClick: () => setDelete(true),
              },
            },
          ]}
        />
      </div>
      <hr />
      <p className="whitespace-pre-wrap">{journal.content}</p>
      <Dialog
        open={isDelete}
        title={`Delete this journal?`}
        content={
          (
            <p>
              Are your sure to permanently delete <b>{journal.name}</b>.
            </p>
          ) as any
        }
        onClose={() => setDelete(false)}
        actions={[
          <Button
            onClick={deleteJournal}
            className={"bg-red-600 hover:bg-red-700"}
          >
            Confirm
          </Button>,
          <Button variant="secondary" onClick={() => setDelete(false)}>
            Cancel
          </Button>,
        ]}
      />
    </article>
  );
}
