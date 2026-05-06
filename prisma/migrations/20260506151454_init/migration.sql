-- CreateEnum
CREATE TYPE "ResumeType" AS ENUM ('CORPORATE', 'FEDERAL', 'UPLOADED', 'MANUAL');

-- CreateEnum
CREATE TYPE "UploadedDocumentType" AS ENUM ('RESUME', 'JOB_DESCRIPTION', 'COVER_LETTER', 'OTHER');

-- CreateEnum
CREATE TYPE "JobDescriptionSource" AS ENUM ('PASTED', 'UPLOADED', 'URL');

-- CreateEnum
CREATE TYPE "ParseStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "GeneratedDocumentType" AS ENUM ('CORPORATE_RESUME', 'FEDERAL_RESUME', 'COVER_LETTER', 'RESUME_FEEDBACK', 'INTERVIEW_PREP');

-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('FULLTIME', 'PARTTIME', 'INTERNSHIP', 'CONTRACT', 'APPRENTICESHIP', 'SEASONAL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "stripeCustomerId" TEXT,
    "email" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "imageUrl" TEXT,
    "isFirstTimeUser" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "fullName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "location" TEXT,
    "website" TEXT,
    "linkedin" TEXT,
    "gitHub" TEXT,
    "headline" TEXT,
    "summary" TEXT,
    "skills" JSONB,
    "techSkills" JSONB,
    "workExperience" JSONB,
    "education" JSONB,
    "certifications" JSONB,
    "projects" JSONB,
    "accomplishments" JSONB,
    "federalDetails" JSONB,
    "rawSourceText" TEXT,
    "sourceResumeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CareerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resume" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "resumeType" "ResumeType" NOT NULL DEFAULT 'CORPORATE',
    "resumeTitle" TEXT,
    "description" TEXT,
    "parsed" BOOLEAN NOT NULL DEFAULT false,
    "parsedWith" TEXT,
    "rawTextContent" TEXT,
    "content" JSONB,
    "shareToken" TEXT NOT NULL,
    "photoUrl" TEXT,
    "showPhoto" BOOLEAN NOT NULL DEFAULT true,
    "themeColor" TEXT NOT NULL DEFAULT '#000000',
    "themeId" TEXT,
    "borderStyle" TEXT NOT NULL DEFAULT 'squircle',
    "firstName" TEXT,
    "lastName" TEXT,
    "jobTitle" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "userEmail" TEXT,
    "userName" TEXT,
    "website" TEXT,
    "linkedin" TEXT,
    "gitHub" TEXT,
    "summary" TEXT,
    "skills" TEXT[],
    "interest" TEXT[],
    "uploadedFileUrl" TEXT,
    "isUploaded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkExperience" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "position" TEXT,
    "company" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "location" TEXT,
    "duties" TEXT,
    "responsibilities" TEXT,
    "accomplishments" TEXT,
    "description" TEXT,
    "clearance" TEXT,
    "grade" TEXT,
    "status" TEXT,
    "time" TEXT,
    "hours" TEXT,
    "supervisor" TEXT,
    "supervisorPhone" TEXT,
    "salary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechSkill" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "name" TEXT,
    "rating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TechSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "degree" TEXT,
    "school" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "location" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "name" TEXT,
    "issuer" TEXT,
    "issuedDate" TIMESTAMP(3),
    "expiresDate" TIMESTAMP(3),
    "credentialUrl" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT,
    "description" TEXT,
    "technologies" TEXT[],
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoverLetter" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "template" TEXT,
    "themeColor" TEXT,
    "themeId" TEXT,
    "borderStyle" TEXT NOT NULL DEFAULT 'squircle',
    "showPhoto" BOOLEAN NOT NULL DEFAULT true,
    "shareToken" TEXT NOT NULL,
    "body" TEXT,
    "content" JSONB,
    "firstName" TEXT,
    "lastName" TEXT,
    "userEmail" TEXT,
    "userPhone" TEXT,
    "userAddress" TEXT,
    "userPhotoUrl" TEXT,
    "website" TEXT,
    "linkedin" TEXT,
    "gitHub" TEXT,
    "jobTitle" TEXT,
    "companyName" TEXT,
    "companyAddress" TEXT,
    "companyPhone" TEXT,
    "companyEmail" TEXT,
    "recipientName" TEXT,
    "signatureUrl" TEXT,
    "signatureColor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoverLetter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobDescription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "title" TEXT,
    "company" TEXT,
    "location" TEXT,
    "employmentType" TEXT,
    "salary" TEXT,
    "rawText" TEXT NOT NULL,
    "parsedData" JSONB,
    "requiredSkills" TEXT[],
    "preferredSkills" TEXT[],
    "responsibilities" TEXT[],
    "qualifications" TEXT[],
    "keywords" TEXT[],
    "source" "JobDescriptionSource" NOT NULL DEFAULT 'PASTED',
    "fileUrl" TEXT,
    "fileName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneratedDocument" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "jobDescriptionId" TEXT,
    "resumeId" TEXT,
    "coverLetterId" TEXT,
    "type" "GeneratedDocumentType" NOT NULL,
    "resumeFormat" "ResumeType",
    "title" TEXT,
    "content" JSONB,
    "plainText" TEXT,
    "aiModel" TEXT,
    "promptVersion" TEXT,
    "matchScore" INTEGER,
    "keywordMatches" TEXT[],
    "missingKeywords" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GeneratedDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadedDocument" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "documentType" "UploadedDocumentType" NOT NULL,
    "fileName" TEXT,
    "fileUrl" TEXT,
    "fileMimeType" TEXT,
    "fileSize" INTEGER,
    "rawText" TEXT,
    "parsedData" JSONB,
    "parser" TEXT,
    "parseStatus" "ParseStatus" NOT NULL DEFAULT 'PENDING',
    "parseError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UploadedDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "resumeId" TEXT,
    "position" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT,
    "mode" "Mode",
    "status" TEXT NOT NULL,
    "salary" TEXT,
    "postedAt" TIMESTAMP(3),
    "dateApplied" TIMESTAMP(3),
    "description" TEXT,
    "requirements" TEXT[],
    "category" TEXT,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedJob" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "industry" TEXT,
    "techstack" TEXT[],
    "questions" TEXT[],
    "coverImage" TEXT,
    "finalized" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "categoryScores" JSONB NOT NULL,
    "strengths" TEXT[],
    "areasForImprovement" TEXT[],
    "finalAssessment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_subscriptions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "stripePriceId" TEXT,
    "stripeCurrentPeriodEnd" TIMESTAMP(3),
    "stripeCancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "stripePlanName" TEXT,
    "stripeInterval" TEXT,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "tag" TEXT,
    "content" TEXT,
    "slug" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_clerkId_idx" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "CareerProfile_userId_key" ON "CareerProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CareerProfile_clerkId_key" ON "CareerProfile"("clerkId");

-- CreateIndex
CREATE INDEX "CareerProfile_clerkId_idx" ON "CareerProfile"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Resume_shareToken_key" ON "Resume"("shareToken");

-- CreateIndex
CREATE INDEX "Resume_userId_idx" ON "Resume"("userId");

-- CreateIndex
CREATE INDEX "Resume_clerkId_idx" ON "Resume"("clerkId");

-- CreateIndex
CREATE INDEX "WorkExperience_resumeId_idx" ON "WorkExperience"("resumeId");

-- CreateIndex
CREATE INDEX "TechSkill_resumeId_idx" ON "TechSkill"("resumeId");

-- CreateIndex
CREATE INDEX "Education_resumeId_idx" ON "Education"("resumeId");

-- CreateIndex
CREATE INDEX "Certification_resumeId_idx" ON "Certification"("resumeId");

-- CreateIndex
CREATE INDEX "Project_resumeId_idx" ON "Project"("resumeId");

-- CreateIndex
CREATE UNIQUE INDEX "CoverLetter_shareToken_key" ON "CoverLetter"("shareToken");

-- CreateIndex
CREATE INDEX "CoverLetter_userId_idx" ON "CoverLetter"("userId");

-- CreateIndex
CREATE INDEX "CoverLetter_clerkId_idx" ON "CoverLetter"("clerkId");

-- CreateIndex
CREATE INDEX "JobDescription_userId_idx" ON "JobDescription"("userId");

-- CreateIndex
CREATE INDEX "JobDescription_clerkId_idx" ON "JobDescription"("clerkId");

-- CreateIndex
CREATE INDEX "GeneratedDocument_userId_idx" ON "GeneratedDocument"("userId");

-- CreateIndex
CREATE INDEX "GeneratedDocument_clerkId_idx" ON "GeneratedDocument"("clerkId");

-- CreateIndex
CREATE INDEX "GeneratedDocument_jobDescriptionId_idx" ON "GeneratedDocument"("jobDescriptionId");

-- CreateIndex
CREATE INDEX "GeneratedDocument_resumeId_idx" ON "GeneratedDocument"("resumeId");

-- CreateIndex
CREATE INDEX "GeneratedDocument_coverLetterId_idx" ON "GeneratedDocument"("coverLetterId");

-- CreateIndex
CREATE INDEX "UploadedDocument_userId_idx" ON "UploadedDocument"("userId");

-- CreateIndex
CREATE INDEX "UploadedDocument_clerkId_idx" ON "UploadedDocument"("clerkId");

-- CreateIndex
CREATE INDEX "UploadedDocument_documentType_idx" ON "UploadedDocument"("documentType");

-- CreateIndex
CREATE INDEX "Job_userId_idx" ON "Job"("userId");

-- CreateIndex
CREATE INDEX "Job_clerkId_idx" ON "Job"("clerkId");

-- CreateIndex
CREATE INDEX "Job_resumeId_idx" ON "Job"("resumeId");

-- CreateIndex
CREATE INDEX "SavedJob_userId_idx" ON "SavedJob"("userId");

-- CreateIndex
CREATE INDEX "SavedJob_jobId_idx" ON "SavedJob"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedJob_userId_jobId_key" ON "SavedJob"("userId", "jobId");

-- CreateIndex
CREATE INDEX "Interview_userId_idx" ON "Interview"("userId");

-- CreateIndex
CREATE INDEX "Feedback_interviewId_idx" ON "Feedback"("interviewId");

-- CreateIndex
CREATE INDEX "Feedback_userId_idx" ON "Feedback"("userId");

-- CreateIndex
CREATE INDEX "Feedback_clerkId_idx" ON "Feedback"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "user_subscriptions_userId_key" ON "user_subscriptions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_subscriptions_clerkId_key" ON "user_subscriptions"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "user_subscriptions_stripeCustomerId_key" ON "user_subscriptions"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "user_subscriptions_stripeSubscriptionId_key" ON "user_subscriptions"("stripeSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");

-- AddForeignKey
ALTER TABLE "CareerProfile" ADD CONSTRAINT "CareerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechSkill" ADD CONSTRAINT "TechSkill_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoverLetter" ADD CONSTRAINT "CoverLetter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobDescription" ADD CONSTRAINT "JobDescription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneratedDocument" ADD CONSTRAINT "GeneratedDocument_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneratedDocument" ADD CONSTRAINT "GeneratedDocument_jobDescriptionId_fkey" FOREIGN KEY ("jobDescriptionId") REFERENCES "JobDescription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneratedDocument" ADD CONSTRAINT "GeneratedDocument_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneratedDocument" ADD CONSTRAINT "GeneratedDocument_coverLetterId_fkey" FOREIGN KEY ("coverLetterId") REFERENCES "CoverLetter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedDocument" ADD CONSTRAINT "UploadedDocument_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedJob" ADD CONSTRAINT "SavedJob_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedJob" ADD CONSTRAINT "SavedJob_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
