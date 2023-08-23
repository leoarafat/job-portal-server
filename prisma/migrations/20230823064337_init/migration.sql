-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FullTime', 'Internship', 'PartTime');

-- CreateEnum
CREATE TYPE "JobCategory" AS ENUM ('SoftwareDevelopment', 'WebDevelopment', 'DataScience', 'NetworkAdministration', 'CyberSecurity', 'DatabaseAdministration', 'DevOps', 'CloudComputing', 'ITConsulting', 'SystemAnalysis', 'UIUXDesign', 'QualityAssurance', 'ITSupport', 'BusinessIntelligence', 'MobileAppDevelopment');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('FullTime', 'PartTime', 'Remote');

-- CreateTable
CREATE TABLE "candidates" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" TEXT,
    "nidNumber" TEXT,
    "mobileNumber" TEXT,
    "photoUrl" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Candidate',
    "portfolioUrl" TEXT,
    "facebookUrl" TEXT,
    "linkedinUrl" TEXT,
    "jobType" "JobType",
    "presentAddress" TEXT,
    "permanentAddress" TEXT,
    "careerObjective" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "educations" TEXT,
    "experience" TEXT,

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employes" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photoUrl" TEXT,
    "role" TEXT NOT NULL DEFAULT 'Employe',
    "website" TEXT,
    "facebookUrl" TEXT,
    "twitterUrl" TEXT,
    "linkedinUrl" TEXT,
    "companySize" TEXT,
    "tin" TEXT,
    "tradeLicenseNumber" TEXT,
    "companyLogo" TEXT,
    "address" TEXT,
    "description" TEXT,
    "recruiterName" TEXT,
    "recruiterDesignation" TEXT,
    "recruiterNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "positionSummery" TEXT NOT NULL,
    "jobResponsibilities" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "requiredSkill" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "benefits" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "vacancy" INTEGER NOT NULL,
    "jobCategory" "JobCategory" NOT NULL,
    "deadline" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "employeeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "savedjob" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "candidateId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "savedjob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "candidates_email_key" ON "candidates"("email");

-- CreateIndex
CREATE UNIQUE INDEX "candidates_password_key" ON "candidates"("password");

-- CreateIndex
CREATE UNIQUE INDEX "employes_email_key" ON "employes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employes_password_key" ON "employes"("password");

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "savedjob" ADD CONSTRAINT "savedjob_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "savedjob" ADD CONSTRAINT "savedjob_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
