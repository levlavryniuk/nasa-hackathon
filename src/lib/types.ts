export interface Statistics {
  id: string;
  near_earth_object_count: number;
  close_approach_count: number;
  last_updated: string;
  source: string;
  nasa_jpl_url: string;
}

export interface RelativeVelocity {
  kilometers_per_second: string;
  kilometers_per_hour: string;
  miles_per_hour: string;
}

export interface MissDistance {
  astronomical: string;
  lunar: string;
  kilometers: string;
  miles: string;
}

export interface CloseApproachData {
  close_approach_date: string;
  close_approach_date_full?: string;
  epoch_date_close_approach: number;
  relative_velocity: RelativeVelocity;
  miss_distance: MissDistance;
  orbiting_body: string;
}

export interface EstimatedDiameter {
  estimated_diameter_min: number;
  estimated_diameter_max: number;
}

export interface EstimatedDiameterContainer {
  kilometers: EstimatedDiameter;
  meters: EstimatedDiameter;
  miles: EstimatedDiameter;
  feet: EstimatedDiameter;
}

export interface OrbitClass {
  orbit_class_type:
    | "IEO"
    | "ATE"
    | "APO"
    | "AMO"
    | "MCA"
    | "IMB"
    | "MBA"
    | "OMB"
    | "TJN"
    | "CEN"
    | "TNO"
    | "PAA"
    | "HYA"
    | "HYP"
    | "PAR"
    | "COM"
    | "JFC"
    | "HTC"
    | "ETC"
    | "CTC"
    | "JFc";
  orbit_class_description: string;
  orbit_class_range: string;
}

export interface OrbitalData {
  orbit_id: string;
  orbit_determination_date: string;
  first_observation_date: string;
  last_observation_date: string;
  data_arc_in_days: number;
  observations_used: number;
  orbit_uncertainty: string;
  minimum_orbit_intersection: string;
  jupiter_tisserand_invariant: string;
  epoch_osculation: string;
  eccentricity: string;
  semi_major_axis: string;
  inclination: string;
  ascending_node_longitude: string;
  orbital_period: string;
  perihelion_distance: string;
  perihelion_argument: string;
  aphelion_distance: string;
  perihelion_time: string;
  mean_anomaly: string;
  mean_motion: string;
  equinox: string;
  orbit_class: OrbitClass;
}

export interface NearEarthObject {
  links: Record<string, string>;
  id: string;
  neo_reference_id: string;
  name: string;
  name_limited: string;
  designation: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: EstimatedDiameterContainer;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: CloseApproachData[];
  orbital_data: OrbitalData;
  is_sentry_object: boolean;
  sentry_data?: string;
}

export interface PageMetaData {
  size: number;
  total_elements: number;
  total_pages: number;
  number: number;
}

export interface PageNearEarthObject {
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  numberOfElements: number;
  content: NearEarthObject[];
  pageable: PageableObject;
  sort: SortObject;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface PageableObject {
  offset: number;
  sort: SortObject;
  paged: boolean;
  unpaged: boolean;
  pageNumber: number;
  pageSize: number;
}

export interface SortObject {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

export interface NearEarthObjectRestDto {
  links: Record<string, string>;
  element_count: number;
  near_earth_objects: Record<string, NearEarthObject[]>;
}

export interface NearEarthObjectRestPagingDto {
  links: Record<string, string>;
  page: PageMetaData;
  near_earth_objects: NearEarthObject[];
}

export interface SentryImpactRiskObject {
  links: Record<string, string>;
  spkId: string;
  designation: string;
  sentryId: string;
  fullname: string;
  year_range_min: string;
  year_range_max: string;
  potential_impacts: string;
  impact_probability: string;
  v_infinity: string;
  absolute_magnitude: string;
  estimated_diameter: string;
  palermo_scale_ave: string;
  Palermo_scale_max: string;
  torino_scale: string;
  last_obs: string;
  last_obs_jd: string;
  url_nasa_details: string;
  url_orbital_elements: string;
  is_active_sentry_object: boolean;
  removal_date?: string;
  url_impact_details: string;
  url_orbital_element_details: string;
  average_lunar_distance: number;
}

export interface PageSentryImpactRiskObject {
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  numberOfElements: number;
  content: SentryImpactRiskObject[];
  pageable: PageableObject;
  sort: SortObject;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface SentryObjectPagingDto {
  upPage?: PageSentryImpactRiskObject;
  links: Record<string, string>;
  page: PageMetaData;
  sentry_objects: SentryImpactRiskObject[];
}
