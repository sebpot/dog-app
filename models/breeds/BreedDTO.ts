import { MinMax } from "../MinMax";

export interface BreedDTO {
  id: string;
  type: 'breed';
  attributes: BreedAttributesDTO;
  relationships: RelationshipsDTO;
}

export interface BreedAttributesDTO {
  name: string;
  description: string;
  life: MinMax<number>;
  male_weight: MinMax<number>;
  female_weight: MinMax<number>;
  hypoallergenic: boolean;
}

export interface RelationshipsDTO {
  group: RelationshipGroupDTO;
}

interface RelationshipGroupDTO {
  data: RelationshipGroupDataDTO;
}

interface RelationshipGroupDataDTO {
  id: string;
  type: 'group';
}
