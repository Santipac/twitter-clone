import React, {
  type FormEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Button from "../ui/Button";
import ProfileImage from "../ui/ProfileImage";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";

function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
  if (textArea == null) return;
  textArea.style.height = "0";
  textArea.style.height = `${textArea.scrollHeight}px`;
}

function Form() {
  const session = useSession();
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, []);
  const trpcUtils = api.useContext();

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [inputValue]);

  const createTweet = api.tweet.create.useMutation({
    onSuccess: (newTweet) => {
      setInputValue("");

      if (session.status !== "authenticated") return;
      // This function add the new Tweet to the cache list.
      trpcUtils.tweet.infiniteFeed.setInfiniteData({}, (oldData) => {
        if (oldData == null || oldData.pages[0] == null) return;

        const newCacheTweet = {
          ...newTweet,
          likeCount: 0,
          likedByMe: false,
          user: {
            id: session.data.user.id,
            name: session.data.user.name || null,
            image: session.data.user.image || null,
          },
        };

        return {
          ...oldData,
          // We modify the first page to load the new tweet on it, and use the slice to continue with the pagination from the second unmodified page.
          pages: [
            {
              ...oldData.pages[0],
              tweets: [newCacheTweet, ...oldData.pages[0].tweets],
            },
            ...oldData.pages.slice(1),
          ],
        };
      });
    },
  });
  if (session.status !== "authenticated") return null;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (inputValue === "") return;
    createTweet.mutate({ content: inputValue });
    setInputValue("");
  }

  return (
    <form
      className="flex flex-col gap-2 border-b px-4 py-3"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-4">
        <ProfileImage src={session.data.user.image} />
        <textarea
          ref={inputRef}
          value={inputValue}
          onChange={({ target }) => setInputValue(target.value)}
          className="flex-grow resize-none overflow-hidden bg-white p-4 text-lg text-gray-600 outline-none"
          placeholder="What's happening?"
        />
      </div>
      <Button
        disabled={inputValue === ""}
        className="self-end bg-blue-500 text-white"
      >
        Tweet
      </Button>
    </form>
  );
}

function NewTweetForm() {
  const session = useSession();
  if (session.status !== "authenticated") return null;
  return <Form />;
}

export default NewTweetForm;
