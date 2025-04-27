// utils/dataFields.ts

export interface DataField {
    value: string
    label: string
    type: string
    table: string
    options?: string[]
  }
  
  export const dataFields: DataField[] = [
    // PersonalInfo fields
    { value: 'name', label: 'Name', type: 'string', table: 'PersonalInfo' },
    { value: 'dob', label: 'Date of birth', type: 'date', table: 'PersonalInfo' },
    {
      value: 'gender',
      label: 'Gender',
      type: 'string',
      table: 'PersonalInfo',
      options: ['M', 'F', 'Other']
    },
    { value: 'race', label: 'Race', type: 'string', table: 'PersonalInfo' },
    { value: 'ethnicity', label: 'Ethnicity', type: 'string', table: 'PersonalInfo' },
    { value: 'phoneNumber', label: 'Phone number', type: 'string', table: 'PersonalInfo' },
    { value: 'address', label: 'Address', type: 'string', table: 'PersonalInfo' },
    { value: 'email', label: 'Email', type: 'string', table: 'PersonalInfo' },
  
    // CaseInfo fields
    { value: 'caseNumber', label: 'Case number', type: 'string', table: 'CaseInfo' },
    { value: 'jurisdiction', label: 'Jurisdiction', type: 'string', table: 'CaseInfo' },
    { value: 'exonerationNumber', label: 'Exoneration number', type: 'int', table: 'CaseInfo' },
    { value: 'yearsInPrison', label: 'Years in prison', type: 'int', table: 'CaseInfo' },
    { value: 'arrestDate', label: 'Arrest date', type: 'date', table: 'CaseInfo' },
    { value: 'freedomDate', label: 'Freedom date', type: 'date', table: 'CaseInfo' },
    { value: 'exonerationDate', label: 'Exoneration date', type: 'date', table: 'CaseInfo' },
    { value: 'crimeType', label: 'Crime type', type: 'string', table: 'CaseInfo' },
    { value: 'sentence', label: 'Sentence', type: 'int', table: 'CaseInfo' },
  
    // LegalInfo fields
    { value: 'originalCharges', label: 'Original charges', type: 'tag', table: 'LegalInfo' },
    { value: 'convictionMethod', label: 'Conviction method', type: 'string', table: 'LegalInfo' },
    { value: 'exonerationMethod', label: 'Exoneration method', type: 'string', table: 'LegalInfo' },
    { value: 'legalRepresentation', label: 'Legal representation', type: 'string', table: 'LegalInfo' },
    { value: 'prosecutor', label: 'Prosecutor', type: 'string', table: 'LegalInfo' },
    { value: 'judge', label: 'Judge', type: 'string', table: 'LegalInfo' },
    { value: 'officersInvolved', label: 'Officers involved', type: 'tag', table: 'LegalInfo' },
  
    // WrongfulConvictionInfo fields
    { value: 'falseConfession', label: 'False confession', type: 'bool', table: 'WrongfulConvictionInfo' },
    { value: 'eyewitnessMisidentification', label: 'Eyewitness misidentification', type: 'bool', table: 'WrongfulConvictionInfo' },
    { value: 'inadequateLegalDefense', label: 'Inadequate legal defense', type: 'bool', table: 'WrongfulConvictionInfo' },
    { value: 'policeMisconduct', label: 'Police misconduct', type: 'bool', table: 'WrongfulConvictionInfo' },
    { value: 'prosecutorialMisconduct', label: 'Prosecutorial misconduct', type: 'bool', table: 'WrongfulConvictionInfo' },
    { value: 'forensicEvidence', label: 'Forensic evidence', type: 'bool', table: 'WrongfulConvictionInfo' },
    { value: 'informantTestimony', label: 'Informant testimony', type: 'bool', table: 'WrongfulConvictionInfo' },
    { value: 'otherInfo', label: 'Other info', type: 'string', table: 'WrongfulConvictionInfo' },
  
    // PostExonerationInfo fields
    { value: 'compensation', label: 'Compensation', type: 'int', table: 'PostExonerationInfo' },
    { value: 'reentrySupport', label: 'Reentry support', type: 'bool', table: 'PostExonerationInfo' },
    { value: 'publicApology', label: 'Public apology', type: 'bool', table: 'PostExonerationInfo' },
    { value: 'currentStatus', label: 'Current status', type: 'string', table: 'PostExonerationInfo' },
  
    // AdditionalInfo fields
    { value: 'mediaCoverage', label: 'Media coverage', type: 'string', table: 'AdditionalInfo' },
    { value: 'advocacyInvolvement', label: 'Advocacy involvement', type: 'string', table: 'AdditionalInfo' },
    { value: 'educationalBackground', label: 'Educational background', type: 'string', table: 'AdditionalInfo' },
    { value: 'healthInfo', label: 'Health info', type: 'string', table: 'AdditionalInfo' },
  
    // MetaData fields
    { value: 'dataSource', label: 'Data source', type: 'string', table: 'MetaData' },
    { value: 'lastUpdated', label: 'Last updated', type: 'date', table: 'MetaData' },
    { value: 'createdAt', label: 'Created at', type: 'date', table: 'MetaData' }
  ]
  