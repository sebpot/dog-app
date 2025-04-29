import { ResponseLinks } from "../ResponseLinks";
import { ResponseMeta } from "../ResponseMeta";
import { BreedDTO } from "./BreedDTO";

export interface BreedsResponse {
  data: BreedDTO[];
  meta: ResponseMeta;
  links: ResponseLinks;
}
