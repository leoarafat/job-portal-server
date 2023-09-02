"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationType = exports.Type = exports.JobCategory = exports.JobType = void 0;
/* eslint-disable no-unused-vars */
// JobEnums.ts
var JobType;
(function (JobType) {
    JobType["FullTime"] = "FullTime";
    JobType["Internship"] = "Internship";
    JobType["PartTime"] = "PartTime";
})(JobType || (exports.JobType = JobType = {}));
var JobCategory;
(function (JobCategory) {
    JobCategory["SoftwareDevelopment"] = "SoftwareDevelopment";
    JobCategory["WebDevelopment"] = "WebDevelopment";
    JobCategory["DataScience"] = "DataScience";
    JobCategory["NetworkAdministration"] = "NetworkAdministration";
    JobCategory["CyberSecurity"] = "CyberSecurity";
    JobCategory["DatabaseAdministration"] = "DatabaseAdministration";
    JobCategory["DevOps"] = "DevOps";
    JobCategory["CloudComputing"] = "CloudComputing";
    JobCategory["ITConsulting"] = "ITConsulting";
    JobCategory["SystemAnalysis"] = "SystemAnalysis";
    JobCategory["UIUXDesign"] = "UIUXDesign";
    JobCategory["QualityAssurance"] = "QualityAssurance";
    JobCategory["ITSupport"] = "ITSupport";
    JobCategory["BusinessIntelligence"] = "BusinessIntelligence";
    JobCategory["MobileAppDevelopment"] = "MobileAppDevelopment";
})(JobCategory || (exports.JobCategory = JobCategory = {}));
var Type;
(function (Type) {
    Type["FullTime"] = "FullTime";
    Type["PartTime"] = "PartTime";
    Type["Remote"] = "Remote";
})(Type || (exports.Type = Type = {}));
// LocationEnums.ts
var LocationType;
(function (LocationType) {
    LocationType["Dhaka"] = "Dhaka";
    LocationType["Khulna"] = "Khulna";
    LocationType["Chattogram"] = "Chattogram";
    LocationType["Barishal"] = "Barishal";
    LocationType["Mymensingh"] = "Mymensingh";
    LocationType["Rajshahi"] = "Rajshahi";
    LocationType["Rangpur"] = "Rangpur";
    LocationType["Sylhet"] = "Sylhet";
})(LocationType || (exports.LocationType = LocationType = {}));
