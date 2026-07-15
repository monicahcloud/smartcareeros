export function parseResumeDate(value?: string | null): Date | undefined {
  if (!value?.trim()) {
    return undefined;
  }

  const parsedDate = new Date(value);

  return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate;
}
