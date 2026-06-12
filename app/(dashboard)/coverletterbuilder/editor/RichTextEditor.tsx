"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
// import BulletList from "@tiptap/extension-bullet-list";
// import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

interface Props {
  onChange?: (html: string) => void;
  placeholder?: string;
  value?: string;
}

export default function RichTextEditor({
  onChange,
  placeholder = "Start typing here...",
  value = "",
}: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      // BulletList,
      // OrderedList,
      ListItem,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[380px] w-full rounded-xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-800 outline-none focus:ring-2 focus:ring-red-100 [&_p]:mb-4",
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();

      console.log(html);

      onChange?.(html);
    },
  });

  useEffect(() => {
    if (!editor) return;

    console.log("EDITOR HTML", editor.getHTML());
    console.log("VALUE", value);

    if (value !== editor.getHTML()) {
      console.log("RESETTING CONTENT");
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  return (
    <div className="space-y-3">
      {editor && (
        <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-black text-white" : ""}>
            Bold
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-black text-white" : ""}>
            Italic
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={
              editor.isActive("underline") ? "bg-black text-white" : ""
            }>
            Underline
          </Button>

          {/* <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={
              editor.isActive("bulletList") ? "bg-black text-white" : ""
            }>
            Bullets
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={
              editor.isActive("orderedList") ? "bg-black text-white" : ""
            }>
            Numbered
          </Button> */}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}>
            Left
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}>
            Center
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}>
            Right
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}>
            Undo
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}>
            Redo
          </Button>
        </div>
      )}

      <EditorContent editor={editor} />
    </div>
  );
}
