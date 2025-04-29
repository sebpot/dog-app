import { ResponseLinks } from "../ResponseLinks";
import { BreedDTO } from "./BreedDTO";

export interface BreedResponse {
  data: BreedDTO;
  links: ResponseLinks;
}
