-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Candidate', 'Employee');

-- CreateTable
CREATE TABLE "candidates" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" TEXT,
    "nidNumber" TEXT,
    "mobileNumber" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserType" NOT NULL,
    "portfolioUrl" TEXT,
    "facebookUrl" TEXT,
    "linkedinUrl" TEXT,
    "jobType" TEXT,
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
    "jobCategory" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
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
    "status" TEXT NOT NULL,
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
ALTER TABLE "savedjob" ADD CONSTRAINT "savedjob_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "savedjob" ADD CONSTRAINT "savedjob_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
