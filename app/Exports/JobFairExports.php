<?php

namespace App\Exports;


use App\Models\JobfairRecruitmentAttendee;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class JobFairExports implements FromQuery, WithHeadings, WithMapping, WithStyles, ShouldAutoSize
{
    protected $search;
    protected $activityId;

    public function __construct($search = '', $activityId = null)
{
    $this->search = $search;
    $this->activityId = $activityId;
}

    

public function query()
{
    $query = JobfairRecruitmentAttendee::query()
        ->with('applicantProfile.educationalBackground', 'applicantProfile.jobPreference')
        ->where('status', 'Attended') 
        ->orderBy('created_at', 'desc');

    // Filter by activity 
    if ($this->activityId) {
        $query->where('recruitment_activity_id', $this->activityId);
    }

    // Filter by search term
    if ($this->search) {
        $query->whereHas('applicantProfile', function($q) {
            $q->where('firstname', 'like', "%{$this->search}%")
              ->orWhere('surname', 'like', "%{$this->search}%")
              ->orWhere('email', 'like', "%{$this->search}%")
              ->orWhere('contact_number', 'like', "%{$this->search}%");
        });
    }

    return $query;
}


    public function headings(): array
    {
        return [
            'ID',
            'First Name',
            'Middle Name',
            'Surname',
            'Suffix',
            'Birthday',
            'Sex',
            'Religion',
            'Civil Status',
            'Barangay',
            'City',
            'Province',
            'TIN Number',
            'Disability',
            'Contact Number',
            'Email',
            'Employment Status',
            'Employment',
            'Preferred Job',
            'Education Level',
            'Course',
            'Year Graduated',
            'Scanned At'
        ];
    }

   public function map($attendee): array
{
    $applicant = $attendee->applicantProfile; // get the related applicant profile
    $education = $applicant->educationalBackground ?? null;
    $jobPref = $applicant->jobPreference ?? null;

    return [
        $applicant->id ?? 'N/A',
        $applicant->firstname ?? 'N/A',
        $applicant->midname ?? 'N/A',
        $applicant->surname ?? 'N/A',
        $applicant->suffix ?? 'N/A',
        $applicant->birthday?->format('Y-m-d') ?? 'N/A',
        $applicant->sex ?? 'N/A',
        $applicant->religion ?? 'N/A',
        $applicant->civil_status ?? 'N/A',
        $applicant->current_barangay ?? 'N/A',
        $applicant->current_city ?? 'N/A',
        $applicant->current_province ?? 'N/A',
        $applicant->tin_number ?? 'N/A',
        $applicant->disability ?? 'N/A',
        $applicant->contact_number ?? 'N/A',
        $applicant->email ?? 'N/A',
        $applicant->employment_status ?? 'N/A',
        $applicant->employment ?? 'N/A',
        $jobPref->preferred_job ?? 'N/A',
        $education->level ?? 'N/A',
        $education->course ?? 'N/A',
        $education->year_graduated ?? 'N/A',
        $attendee->created_at?->format('Y-m-d H:i:s') ?? 'N/A', 
    ];
}



    public function styles(Worksheet $sheet)
{
    $sheet->getStyle('A1:X1')->applyFromArray([
        'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
        'fill' => [
            'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
            'startColor' => ['rgb' => '084896'],
        ],
    ]);

    return [];
}

}


