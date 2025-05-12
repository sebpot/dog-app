const API_INFO_URL = 'https://dogapi.dog/api/v2';
const API_IMG_URL = 'https://dog.ceo/api/breed';

export const API_BREED_LIST_URL = `${API_INFO_URL}/breeds`;
export const apiBreedInfoUrl = (id: string) => `${API_INFO_URL}/breeds/${id}`;
export const API_FACTS_URL = `${API_INFO_URL}/facts?limit=1`;

export const apiBreedImgUrl = (name: string) => {
    const nameUriParts = name.trim()
        .toLocaleLowerCase()
        .split(' ')
        .filter(part => part !== 'american')
        .toReversed()
        .join('/');
    return `${API_IMG_URL}/${nameUriParts}/images/random`;
}
