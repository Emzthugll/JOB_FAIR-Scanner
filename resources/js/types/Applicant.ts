import { User } from '.';

export interface ApplicantProfile {
    user?: User;
    job_preference?: ApplicantProfileJobPreference;
    educational_background?: ApplicantProfileEducationalBackground;
    firstname: string;
    midname: string;
    surname: string;
    suffix?: string;
    birthday: string;
    sex: string;
    disability?: string;
    religion?: string;
    civil_status?: string;
    current_barangay?: string;
    current_city?: string;
    current_province?: string;
    tin_number?: string;
    contact_number?: string;
    email?: string;
    employment_status?: string;
}

export interface ApplicantProfileJobPreference {
    employment?: string;
    preferred_job?: string;
}

export interface ApplicantProfileEducationalBackground {
    level: string;
    course: string;
    school: string;
    year_graduated: string;
}

export interface ScannedApplicant {
    id: number;
    status: string;
    applicant_profile: ApplicantProfile;
}
