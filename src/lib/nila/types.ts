export interface SurveyInput {
  name: string;
  contactNumber: string;
  locationPreference: string;
  travelWillingness: string;
  availability: Record<string, string[]>;
  classTypes: string[];
}

export interface Student extends SurveyInput {
  id: number;
  createdAt: string;
}
