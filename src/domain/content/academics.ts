// src/domain/content/academics.ts
//
// Education, newest first. The board/university names are content, but the city
// is pulled from the identity atoms via the geography composer.

import type { Education } from "@domain/contracts/content";
import { PLACE_TOKENS } from "@domain/identity/atoms/place-tokens";

const CITY = PLACE_TOKENS.city;

export const education: readonly Education[] = [
  {
    degree: "B.E. in Computer Engineering",
    school: "Gujarat Technological University (GTU)",
    period: "2019 – 2023",
    detail: "CPI: 7.48 / 10.0",
  },
  {
    degree: "Higher Secondary (12th Science)",
    school: `GSHSEB, ${CITY}`,
    period: "2018 – 2019",
  },
  {
    degree: "Secondary School (10th)",
    school: `GSEB, ${CITY}`,
    period: "2016 – 2017",
  },
];
