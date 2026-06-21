"use client";

import React, { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { educationSchema, EducationValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal, PlusCircle, Trash2 } from "lucide-react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { ResumeFormState } from "../[id]/types";
import { RESUME_THEME_REGISTRY } from "@/app/(dashboard)/resumes/templates/templateRegistry";

type EducationSectionProps = {
  form: ResumeFormState;
  setForm: React.Dispatch<React.SetStateAction<ResumeFormState>>;
};

function EducationForm({
  form: resumeData,
  setForm: setResumeData,
}: EducationSectionProps) {
  const themeCategory = useMemo(() => {
    const theme = RESUME_THEME_REGISTRY.find(
      (t) => t.id === resumeData.themeId,
    );

    return theme?.category || "Professional";
  }, [resumeData.themeId]);

  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education: resumeData.education || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((values) => {
      const normalizedEducation =
        values.education?.filter(Boolean).map((edu) => ({
          school: edu?.school ?? "",
          degree: edu?.degree ?? "",
          location: edu?.location ?? "",
          startDate: edu?.startDate ?? "",
          endDate: edu?.endDate ?? "",
        })) ?? [];

      setResumeData((prev) => ({
        ...prev,
        education: normalizedEducation,
      }));
    });

    return () => unsubscribe();
  }, [form, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);

      move(oldIndex, newIndex);
    }
  }

  return (
    <div className="education-info mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tighter">
          Education
        </h2>

        <p className="text-sm italic text-muted-foreground">
          Highlight your academic background for the{" "}
          <span className="font-bold text-blue-600">{themeCategory}</span>{" "}
          layout.
        </p>

        <Form {...form}>
          <form className="space-y-4 text-left">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}>
              <SortableContext
                items={fields}
                strategy={verticalListSortingStrategy}>
                {fields.map((field, index) => (
                  <EducationItem
                    key={field.id}
                    index={index}
                    form={form}
                    remove={remove}
                    id={field.id}
                    category={themeCategory}
                  />
                ))}
              </SortableContext>
            </DndContext>

            <div className="flex justify-center pt-6">
              <Button
                variant="outline"
                type="button"
                className="h-12 rounded-full border-2 border-dashed px-10 transition-all hover:bg-slate-50"
                onClick={() =>
                  append({
                    degree: "",
                    location: "",
                    school: "",
                    startDate: "",
                    endDate: "",
                  })
                }>
                <PlusCircle className="mr-2 size-4" />
                Add Education / Certification
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default EducationForm;

interface EducationItemProps {
  id: string;
  form: UseFormReturn<EducationValues>;
  index: number;
  remove: (index: number) => void;
  category: string;
}

function EducationItem({
  form,
  index,
  remove,
  id,
  category,
}: EducationItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "space-y-5 rounded-3xl border bg-white p-6 transition-all duration-200",
        isDragging
          ? "z-50 scale-105 cursor-grabbing border-blue-200 shadow-2xl"
          : "border-slate-100 shadow-sm",
      )}>
      <div className="flex items-center justify-between border-b border-slate-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">
            EDU {index + 1}
          </div>

          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {category} Section
          </span>
        </div>

        <GripHorizontal
          className="size-5 cursor-grab text-slate-300 transition-colors hover:text-slate-600"
          {...attributes}
          {...listeners}
        />
      </div>

      <FormField
        control={form.control}
        name={`education.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="ml-1 text-[10px] font-bold uppercase text-slate-500">
              Degree / Certificate Name
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="e.g. B.S. in Computer Science"
                className="rounded-xl"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name={`education.${index}.school`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-1 text-[10px] font-bold uppercase text-slate-500">
                Institution Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. University of Georgia"
                  className="rounded-xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`education.${index}.location`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-1 text-[10px] font-bold uppercase text-slate-500">
                Location
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. Athens, GA"
                  className="rounded-xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`education.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-1 text-[10px] font-bold uppercase text-slate-500">
                Start Date
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  className="rounded-xl"
                  value={field.value?.slice(0, 10) ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`education.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="ml-1 text-[10px] font-bold uppercase text-slate-500">
                End Date
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  className="rounded-xl"
                  value={field.value?.slice(0, 10) ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex items-center gap-2 px-1">
        <div className="size-1.5 animate-pulse rounded-full bg-blue-500" />

        <FormDescription className="text-[10px] italic">
          Leave <span className="font-bold">end date</span> empty if currently
          enrolled.
        </FormDescription>
      </div>

      <div className="flex justify-end border-t border-slate-50 pt-3">
        <Button
          variant="ghost"
          size="sm"
          type="button"
          className="rounded-xl text-red-400 hover:bg-red-50 hover:text-red-600"
          onClick={() => remove(index)}>
          <Trash2 className="mr-2 size-3" />
          Delete Entry
        </Button>
      </div>
    </div>
  );
}
