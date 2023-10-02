export interface Hero {
  PrimaryName?: string;
  AttributeName?: string;
  Group?: string;
  EnziGrouping?: string;
  ProperBuilds?: Builds[];
}
export interface Builds {
  Name?: string;
  Talents?: string;
}
export interface Player {
  Name?: string;
  Role?: string;
  Id?: string;
  Hero?: Hero;
  RandomBuild?: string;
}
export const roles = [
  "Mage",
  "Tank",
  "Support",
  "Solo-Lane",
  "Assassin",
  "Adc",
  "Specialist",
];
