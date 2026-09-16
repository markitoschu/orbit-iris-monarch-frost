import type {
  AreaId,
  ClassId,
  CommitStyle,
  DayId,
  FreqId,
  MakeupId,
  PackId,
  PriorityId,
  TimeBucket,
  TravelId,
  WindowId,
} from "./constants";

export type Student = {
  id: number;
  firstName: string;
  liveArea: AreaId;
  workArea: AreaId | "";
  convenientAreas: AreaId[];
  travel: TravelId;
  preferredDays: DayId[];
  preferredTimes: TimeBucket[];
  timeWindows: WindowId[];
  classTypes: ClassId[];
  frequency: FreqId;
  statedPrice: number;
  commitPrice: number;
  packages: PackId[];
  commitmentStyle: CommitStyle;
  makeup: MakeupId;
  studioPriorities: PriorityId[];
  trueYogaStudent: boolean;
  createdAt: string;
};

export type SurveyInput = Omit<Student, "id" | "createdAt">;

export type SlotKey = {
  area: AreaId;
  day: DayId;
  window: WindowId;
  classType: ClassId;
};

export type RevenueSplit = {
  eightPackHeads: number;
  fourPackHeads: number;
  monthlyHeads: number;
  dropinHeads: number;
  programmeRevenue: number;
  hybridRevenue: number;
  sessionsSoldHybrid: number;
};

export type SlotScore = SlotKey & {
  interested: number;
  committable: number;
  programmeHeads: number;
  rental: number;
  studio: "small" | "large";
  split: RevenueSplit;
  programmeContribution: number;
  hybridContribution: number;
  viableProgramme: boolean;
  viableHybrid: boolean;
  names: string[];
};

export type HeatCell = {
  day: DayId;
  window: WindowId;
  count: number;
};

export type AreaDemand = {
  area: AreaId;
  cluster: string;
  live: number;
  convenient: number;
};

export type PricePoint = {
  price: number;
  overallCommit: number;
  overallStated: number;
};
