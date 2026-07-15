import ResumeProcessingStatus from "../ResumeProcessingStatus";

type ProcessingPageProps = {
  params: Promise<{
    uploadId: string;
  }>;
};

export default async function ResumeProcessingPage({
  params,
}: ProcessingPageProps) {
  const { uploadId } = await params;

  return (
    <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-3xl items-center px-6 py-12">
      <ResumeProcessingStatus uploadId={uploadId} />
    </main>
  );
}
