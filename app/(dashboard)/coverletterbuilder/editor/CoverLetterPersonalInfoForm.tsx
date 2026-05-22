"use client";

import { userInfoSchema, UserInfoValues } from "@/lib/validation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import { CoverLetterFormProps } from "@/lib/types";
import { Button } from "@/components/ui/button";
import FormStepWrapper from "./FormStepWrapper";
import { mapToUserInfoValues } from "@/lib/utils";
import Image from "next/image";
import { X } from "lucide-react";

export default function CoverLetterPersonalInfoForm({
  coverLetterData,
  setCoverLetterData,
}: CoverLetterFormProps) {
  const form = useForm<UserInfoValues>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: mapToUserInfoValues(coverLetterData),
  });

  const photoInputRef = useRef<HTMLInputElement>(null);

  const [photoPreview, setPhotoPreview] = useState<string | null>(
    coverLetterData.userPhotoUrl || null,
  );

  const watchedValues = useWatch({
    control: form.control,
  });

  useEffect(() => {
    setCoverLetterData((prev) => ({
      ...prev,
      ...watchedValues,
    }));
  }, [watchedValues, setCoverLetterData]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File | null) => void,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onChange(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageUrl = reader.result as string;

      setPhotoPreview(imageUrl);

      setCoverLetterData((prev) => ({
        ...prev,
        userPhoto: file,
        userPhotoUrl: imageUrl,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (onChange: (value: File | undefined) => void) => {
    onChange(undefined);
    setPhotoPreview(null);

    setCoverLetterData((prev) => ({
      ...prev,
      userPhoto: undefined,
      userPhotoUrl: undefined,
    }));

    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }
  };

  return (
    <FormStepWrapper
      title="Personal Branding"
      description="Tell the employer who you are and how to reach you.">
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="userPhoto"
            render={({ field: { value, onChange, ...fieldValues } }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                  Professional Photo
                </FormLabel>

                <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 shadow-sm">
                  <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-slate-200 shadow-md">
                    {photoPreview ? (
                      <Image
                        src={photoPreview}
                        alt="Profile Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-[8px] font-black uppercase text-slate-400">
                        No Photo
                      </span>
                    )}
                  </div>

                  <div className="flex grow flex-col gap-2">
                    <FormControl>
                      <Input
                        {...fieldValues}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, onChange)}
                        ref={photoInputRef}
                        className="h-9 cursor-pointer bg-white text-xs file:border-none file:bg-transparent file:text-[10px] file:font-bold file:uppercase file:text-blue-600"
                      />
                    </FormControl>

                    {photoPreview && (
                      <Button
                        variant="ghost"
                        type="button"
                        className="flex h-auto w-fit items-center gap-1 p-1 text-[10px] font-black uppercase text-red-500 hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleRemovePhoto(onChange)}>
                        <X className="size-3" />
                        Remove Photo
                      </Button>
                    )}
                  </div>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-slate-200 bg-slate-50/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-slate-200 bg-slate-50/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                  Professional Title
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. Senior Software Engineer"
                    className="border-slate-200 bg-slate-50/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="userEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className="border-slate-200 bg-slate-50/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      className="border-slate-200 bg-slate-50/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="userAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                  Mailing Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="City, State"
                    className="border-slate-200 bg-slate-50/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                    Portfolio/Website
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://yourportfolio.com"
                      className="border-slate-200 bg-slate-50/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase text-slate-400">
                    LinkedIn URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="linkedin.com/in/username"
                      className="border-slate-200 bg-slate-50/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </FormStepWrapper>
  );
}
