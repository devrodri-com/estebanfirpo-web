export type EditorialStatus =
  | "reviewed"
  | "reconfirmation_required"
  | "unverified"
  | "inactive";

export type LocalizedText = {
  es: string;
  en: string;
};

export type ReviewValidity =
  | {
      kind: "valid_until";
      date: string;
    }
  | {
      kind: "reconfirm_before_use";
    };

export type ProjectSourceKind =
  | "official_project_site"
  | "official_developer_site"
  | "official_sales_site"
  | "official_fact_sheet"
  | "official_public_record"
  | "internal_catalog"
  | "internal_collateral"
  | "asset_inventory";

export type ProjectSource = {
  id: string;
  title: LocalizedText;
  kind: ProjectSourceKind;
  url?: string;
  repositoryPath?: string;
  issuedAt?: string;
  observedAt: string;
  public: boolean;
  note: LocalizedText;
};

export type GovernedField<T> = {
  value: T | null;
  status: EditorialStatus;
  sourceIds: string[];
  reviewedAt: string | null;
  reviewedBy: string | null;
  validity: ReviewValidity;
  note: LocalizedText;
};

export type PriorityProjectFields = {
  commercialStatus: GovernedField<LocalizedText>;
  price: GovernedField<LocalizedText>;
  delivery: GovernedField<LocalizedText>;
  rentalPolicy: GovernedField<LocalizedText>;
  financing: GovernedField<LocalizedText>;
  availability: GovernedField<LocalizedText>;
  paymentPlan: GovernedField<LocalizedText[]>;
  imageRights: GovernedField<LocalizedText>;
};

export type PriorityProjectGovernance = {
  slug: string;
  overallStatus: EditorialStatus;
  location: LocalizedText;
  developer: LocalizedText;
  summary: LocalizedText;
  profileFit: LocalizedText[];
  factualHighlights: LocalizedText[];
  risks: LocalizedText[];
  openQuestions: LocalizedText[];
  fields: PriorityProjectFields;
  sources: ProjectSource[];
};
