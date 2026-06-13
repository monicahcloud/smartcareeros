"use client";

import React, { useRef, useState } from "react";
import SignaturePad from "react-signature-canvas";
import Image from "next/image";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CoverLetterFormProps } from "@/lib/types";
import { cn } from "@/lib/utils";

import FormStepWrapper from "../../../components/coverletterbuilder/FormStepWrapper";

export default function SignatureForm({
  coverLetterData,
  setCoverLetterData,
}: CoverLetterFormProps) {
  const sigPadRef = useRef<SignaturePad>(null);

  const [localSignatureUrl, setLocalSignatureUrl] = useState<
    string | undefined
  >(undefined);

  const previewUrl = localSignatureUrl || coverLetterData.signatureUrl || "";

  const [penColor, setPenColor] = useState(
    coverLetterData.signatureColor || "#000000",
  );

  const [typedName, setTypedName] = useState("");

  const fontOptions = [
    { label: "Elegant", value: "Dancing Script" },
    { label: "Classic", value: "Great Vibes" },
    { label: "Modern", value: "Pacifico" },
    { label: "Casual", value: "Caveat" },
    { label: "Royal", value: "Kings" },
    { label: "Formal", value: "Allura" },
    { label: "Soft", value: "Sacramento" },
    { label: "Luxury", value: "Alex Brush" },
  ];

  const [selectedFont, setSelectedFont] = useState(fontOptions[0].value);

  const updatePenColor = (color: string) => {
    setPenColor(color);

    setCoverLetterData((prev) => ({
      ...prev,
      signatureColor: color,
    }));
  };

  const saveSignatureUrl = (url: string) => {
    setLocalSignatureUrl(url);

    setCoverLetterData((prev) => ({
      ...prev,
      signatureUrl: url,
    }));
  };

  const handleSaveDrawn = () => {
    const pad = sigPadRef.current;

    if (!pad || pad.isEmpty()) return;

    const url = pad.getTrimmedCanvas().toDataURL("image/png");
    saveSignatureUrl(url);
  };

  const handleSaveTyped = async () => {
    await document.fonts.load(`48px "${selectedFont}"`);
    await document.fonts.ready;

    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 180;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = penColor;
    ctx.font = `72px "${selectedFont}", cursive`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "right";

    ctx.fillText(typedName || "Signature", canvas.width / 2, canvas.height / 2);

    const url = canvas.toDataURL("image/png");
    saveSignatureUrl(url);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);
    saveSignatureUrl(url);
  };

  const handleRemoveSignature = () => {
    setLocalSignatureUrl(undefined);

    setCoverLetterData((prev) => ({
      ...prev,
      signatureUrl: undefined,
    }));
  };

  return (
    <FormStepWrapper
      title="Personal Signature"
      description="Add a professional touch by drawing, typing, or uploading your signature.">
      <div className="space-y-6">
        <div className="flex items-center justify-between border border-slate-100 bg-slate-50/50 p-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-slate-400">
              Ink Color
            </span>

            <span className="text-xs font-bold uppercase text-slate-600">
              {penColor}
            </span>
          </div>

          <input
            type="color"
            value={penColor}
            onChange={(event) => updatePenColor(event.target.value)}
            className="h-10 w-10 cursor-pointer border border-slate-200 bg-white p-1 shadow-sm"
          />
        </div>

        <Tabs defaultValue="draw" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-100/50 p-1">
            <TabsTrigger
              value="draw"
              className="text-[10px] font-black uppercase tracking-widest">
              Draw
            </TabsTrigger>

            <TabsTrigger
              value="type"
              className="text-[10px] font-black uppercase tracking-widest">
              Type
            </TabsTrigger>

            <TabsTrigger
              value="upload"
              className="text-[10px] font-black uppercase tracking-widest">
              Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="draw" className="mt-4 space-y-4">
            <div className="overflow-hidden border-2 border-dashed border-slate-200 bg-white p-2">
              <SignaturePad
                ref={sigPadRef}
                canvasProps={{
                  width: 500,
                  height: 150,
                  className: "h-32 w-full cursor-crosshair",
                }}
                penColor={penColor}
                backgroundColor="rgba(0,0,0,0)"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => sigPadRef.current?.clear()}
                className="text-[10px] font-black uppercase tracking-widest">
                Clear Pad
              </Button>

              <Button
                type="button"
                size="sm"
                onClick={handleSaveDrawn}
                className="bg-red-600 text-[10px] font-black uppercase tracking-widest hover:bg-black">
                Save Signature
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="type" className="mt-4 space-y-4">
            <Input
              placeholder="Type your name..."
              value={typedName}
              onChange={(event) => setTypedName(event.target.value)}
              className="border-slate-200 bg-slate-50/50"
            />

            <div className="grid grid-cols-2 gap-2">
              {fontOptions.map((font) => (
                <button
                  key={font.value}
                  type="button"
                  onClick={() => setSelectedFont(font.value)}
                  className={cn(
                    "p-3 rounded-lg border text-left transition-all",
                    selectedFont === font.value
                      ? "border-blue-600 bg-blue-50/50 shadow-sm"
                      : "border-slate-100 bg-slate-50/30 hover:bg-slate-50",
                  )}>
                  <span className="text-[8px] font-black uppercase text-slate-400 block mb-1">
                    {font.label}
                  </span>
                  <span
                    className="text-xl truncate block"
                    style={{
                      fontFamily: `"${font.value}", cursive`,
                      color: penColor,
                    }}>
                    {typedName || "Signature"}
                  </span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setTypedName("")}
                className="text-[10px] font-black uppercase tracking-widest">
                Reset Text
              </Button>

              <Button
                type="button"
                size="sm"
                onClick={handleSaveTyped}
                className="bg-red-600 text-[10px] font-black uppercase tracking-widest hover:bg-black">
                Save Type
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="mt-4">
            <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed border-slate-200 bg-slate-50/30 transition-all hover:bg-slate-50">
              <span className="text-[10px] font-black uppercase text-slate-400 transition-colors hover:text-red-600">
                Click to Upload Image
              </span>

              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleUpload}
              />
            </label>
          </TabsContent>
        </Tabs>

        {previewUrl && (
          <div className="border-t border-slate-100 pt-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="block text-[10px] font-black uppercase text-slate-400">
                Active Signature
              </span>

              <button
                type="button"
                onClick={handleRemoveSignature}
                className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-red-600">
                <X className="h-3 w-3" />
                Remove
              </button>
            </div>

            <div className="flex justify-center border border-dashed border-slate-100 bg-slate-50/50 p-6">
              <Image
                src={previewUrl}
                alt="Signature Preview"
                width={200}
                height={60}
                className="max-h-16 w-auto object-contain"
                unoptimized
              />
            </div>
          </div>
        )}
      </div>
    </FormStepWrapper>
  );
}
