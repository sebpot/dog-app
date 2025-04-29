export interface FactDTO {
  id: string;
  type: 'fact';
  attributes: FactAttributesDTO;
}

interface FactAttributesDTO {
  body: string;
}
