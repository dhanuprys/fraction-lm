import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import imageCompression from "browser-image-compression";
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import { adminApi } from "@/lib/api/admin";
import { getAssetUrl } from "@/lib/utils";
import { Stack, Row } from "./layout";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { Dialog } from "./controls";
import { Field, Input } from "./Input";
import { useState, useEffect } from "react";

function MathDialog({
  trigger,
  initialLatex,
  onSave,
  title = "Math Formula",
}: {
  trigger: React.ReactNode;
  initialLatex: string;
  onSave: (l: string) => void;
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  const [latex, setLatex] = useState(initialLatex);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (v) setLatex(initialLatex);
      }}
      trigger={trigger}
      title={title}
      description="Write LaTeX syntax below. A live preview will render immediately."
    >
      <Stack gap={4}>
        <div className="p-4 bg-bg cushion-field rounded-control text-center text-ink min-h-[60px] flex items-center justify-center overflow-x-auto">
          <BlockMath math={latex || "\\text{Empty}"} />
        </div>
        <Field label="LaTeX Source">
          {(id, desc) => (
            <Input
              id={id}
              describedBy={desc}
              value={latex}
              onChange={setLatex}
              mono
              placeholder="e.g. x^2 + y^2 = z^2"
            />
          )}
        </Field>
        <Row justify="end" gap={2}>
          <Button type="button" variant="quiet" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            tone="mint"
            onClick={() => {
              onSave(latex);
              setOpen(false);
            }}
          >
            Save Formula
          </Button>
        </Row>
      </Stack>
    </Dialog>
  );
}

// Math Component for TipTap
function MathComponent(props: any) {
  const current = props.node.attrs.latex || "";
  return (
    <NodeViewWrapper className="pouf-math-node group relative border border-transparent rounded p-4 my-2 transition-colors hover:border-mint-400 bg-[color-mix(in_srgb,var(--ink)_2%,transparent)]">
      <MathDialog
        initialLatex={current}
        title="Edit Formula"
        onSave={(newLatex) => {
          props.updateAttributes({ latex: newLatex });
        }}
        trigger={
          <div className="cursor-pointer" title="Click to edit">
            <BlockMath math={current} />
          </div>
        }
      />
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          type="button"
          size="sm"
          variant="quiet"
          tone="warn"
          onClick={() => props.deleteNode()}
        >
          <Icon name="close" size="sm" />
        </Button>
      </div>
    </NodeViewWrapper>
  );
}

const MathExtension = Node.create({
  name: "math",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      latex: {
        default: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="math"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-type": "math" })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(MathComponent);
  },
});

const CustomImage = Image.extend({
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("imagePaste"),
        props: {
          handlePaste(view, event, _slice) {
            const items = event.clipboardData?.items;
            if (!items) return false;

            let handled = false;
            for (const item of items) {
              if (item.type.indexOf("image") === 0) {
                handled = true;
                const file = item.getAsFile();
                if (file) {
                  (async () => {
                    try {
                      // We might want to show a toast or a placeholder here
                      const compressed = await imageCompression(file, {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1024,
                        useWebWorker: true,
                      });
                      const res = await adminApi.uploadFile(compressed);
                      if (res.data?.url) {
                        const node = view.state.schema.nodes.image.create({
                          src: getAssetUrl(res.data.url),
                        });
                        const tr = view.state.tr.replaceSelectionWith(node);
                        view.dispatch(tr);
                      }
                    } catch (err) {
                      console.error("Pasted image upload failed:", err);
                      alert("Failed to upload pasted image");
                    }
                  })();
                }
              }
            }
            return handled;
          },
        },
      }),
    ];
  },
});

interface RichTextEditorProps {
  value: any; // JSON
  onChange: (value: any) => void;
  placeholder?: string;
  minHeight?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start typing...",
  minHeight = "200px",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      MathExtension,
      CustomImage,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value || null,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none w-full max-w-none prose-headings:text-ink prose-p:text-ink prose-a:text-ink prose-strong:text-ink prose-ul:text-ink prose-ol:text-ink prose-li:text-ink text-ink outline-none",
        style: `min-height: ${minHeight};`,
      },
    },
  });

  // Sync external value changes (only if it's vastly different or initialized late)
  useEffect(() => {
    if (editor && value !== undefined) {
      const currentJSON = editor.getJSON();
      // Only set content if currentJSON is essentially empty and value isn't
      if (Object.keys(currentJSON).length <= 1 && value && Object.keys(value).length > 0) {
        editor.commands.setContent(value);
      }
    }
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        try {
          const compressed = await imageCompression(file, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1024,
            useWebWorker: true,
          });
          const res = await adminApi.uploadFile(compressed);
          if (res.data?.url) {
            editor
              .chain()
              .focus()
              .setImage({ src: getAssetUrl(res.data.url) })
              .run();
          }
        } catch (err) {
          console.error(err);
          alert("Failed to upload image");
        }
      }
    };
    input.click();
  };

  const handleAddMath = (latex: string) => {
    editor
      .chain()
      .focus()
      .insertContent({
        type: "math",
        attrs: { latex },
      })
      .run();
  };

  return (
    <div className="cushion-field pouf-input rounded-control w-full flex flex-col overflow-hidden bg-bg focus-within:[box-shadow:var(--pouf-field-focus)] transition-shadow">
      <div className="flex flex-row items-center bg-[color-mix(in_srgb,var(--ink)_2%,transparent)] border-b border-[color-mix(in_srgb,var(--ink)_10%,transparent)] p-2 flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant="quiet"
          tone={editor.isActive("bold") ? "mint" : "idle"}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Icon name="bold" size="sm" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="quiet"
          tone={editor.isActive("italic") ? "mint" : "idle"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Icon name="italic" size="sm" />
        </Button>
        <div className="w-px h-6 bg-[color-mix(in_srgb,var(--ink)_10%,transparent)] mx-1 self-center" />
        <Button
          type="button"
          size="sm"
          variant="quiet"
          tone={editor.isActive("heading", { level: 2 }) ? "mint" : "idle"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <span className="font-bold text-sm">H2</span>
        </Button>
        <Button
          type="button"
          size="sm"
          variant="quiet"
          tone={editor.isActive("bulletList") ? "mint" : "idle"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <Icon name="list" size="sm" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="quiet"
          tone={editor.isActive("orderedList") ? "mint" : "idle"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <Icon name="list-numbers" size="sm" />
        </Button>
        <div className="w-px h-6 bg-[color-mix(in_srgb,var(--ink)_10%,transparent)] mx-1 self-center" />
        <Button
          type="button"
          size="sm"
          variant="quiet"
          onClick={handleImageUpload}
          title="Upload Image (or Paste directly)"
        >
          <Icon name="photo" size="sm" />
        </Button>
        <MathDialog
          initialLatex="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}"
          title="Insert Formula"
          onSave={handleAddMath}
          trigger={
            <Button type="button" size="sm" variant="quiet" title="Insert Math Formula">
              <Icon name="math" size="sm" />
            </Button>
          }
        />
      </div>
      <div className="flex-1 cursor-text p-4 min-h-[200px] text-ink">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
