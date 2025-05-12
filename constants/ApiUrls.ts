const API_INFO_URL = 'https://dogapi.dog/api/v2';
const API_IMG_URL = 'https://dog.ceo/api/breed';

export const API_BREED_LIST_URL = `${API_INFO_URL}/breeds`;
export const apiBreedInfoUrl = (id: string) => `${API_INFO_URL}/breeds/${id}`;
export const API_FACTS_URL = `${API_INFO_URL}/facts?limit=1`;

export const apiBreedImgUrl = (name: string) => {
    name = name.trim();
    let nameUriParts = '';
    if (API_IMG_MAPPING.has(name)) {
        nameUriParts = API_IMG_MAPPING.get(name) as string;
    } else {
        nameUriParts = name.trim()
            .toLocaleLowerCase()
            .split(' ')
            .filter(part => part !== 'american')
            .toReversed()
            .join('/');
    }
    return `${API_IMG_URL}/${nameUriParts}/images/random`;
}

export const getLocalImgUrl = (name: string) => {
    if (LOCAL_IMG_MAPPING.has(name)) {
        return LOCAL_IMG_MAPPING.get(name).uri;
    }
    return null;
}

const API_IMG_MAPPING = new Map<string, string>([
    ["Airedale Terrier", "airedale"],
]);

const LOCAL_IMG_MAPPING = new Map<string, any>([
    ["Alaskan Klee Kai", require("../assets/images/breeds/alaskan-klee-kai.jpg")],
]);
