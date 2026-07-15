import { serve } from "inngest/next";

import { inngest } from "@/lib/inngest/client";
import { parseUploadedResume } from "@/lib/inngest/functions/parse-uploaded-resume";

export const maxDuration = 300;

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [parseUploadedResume],
});
