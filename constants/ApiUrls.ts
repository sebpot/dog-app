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
    ["Alaskan Malamute", "malamute"],
    ["American Eskimo Dog", "eskimo"],
    ["Australian Kelpie", "kelpie"],
    ["Belgian Malinois", "malinois"],
    ["Belgian Tervuren", "tervuren"],
    ["Bernese Mountain Dog", "mountain/bernese"],
    ["Bouvier des Flandres", "bouvier"],
    ["Bullmastiff", "mastiff/bull"],
    ["Bull Terrier", "bullterrier/staffordshire"],
    ["Cardigan Welsh Corgi", "corgi/cardigan"],
    ["Caucasian Shepherd Dog", "ovcharka/caucasian"],
    ["Chinese Shar-Pei", "sharpei"],
    ["Chow Chow", "chow"],
    ["Clumber Spaniel", "clumber"],
    ["Dandie Dinmont Terrier", "terrier/dandie"],
    ["Doberman Pinscher", "doberman"],
    ["English Cocker Spaniel", "spaniel/cocker"],
    ["English Springer Spaniel", "springer/english"],
    ["Entlebucher Mountain Dog", "entlebucher"],
    ["Finnish Lapphund", "finnish/lapphund"],
    ["German Longhaired Pointer", "pointer/germanlonghair"],
    ["German Shepherd Dog", "germanshepherd"],
    ["Greater Swiss Mountain Dog", "mountain/swiss"],
    ["Great Pyrenees", "pyrenees"],
    ["Irish Water Spaniel", "spaniel/irish"],
    ["Japanese Akitainu", "akita"],
    ["Kerry Blue Dog", "terrier/kerryblue"],
    ["Labrador Retriever", "labrador"],
    ["Leonberger", "leonberg"],
    ["Lhasa Apso", "lhasa"],
    ["Manchester Terrier (Toy)", "terrier/toy"],
    ["Old English Sheepdog", "sheepdog/english"],
    ["Parson Russell Terrier", "terrier/russell"],
    ["Pekingese", "pekinese"],
    ["Pembroke Welsh Corgi", "pembroke"],
    ["Poodle (Miniature)", "poodle/miniature"],
    ["Poodle (Standard)", "poodle/standard"],
    ["Poodle (Toy)", "poodle/toy"],
    ["Redbone Coonhound", "redbone"],
    ["Segugio Italiano", "segugio/italian"],
    ["Shiba Inu", "shiba"],
    ["Shih Tzu", "shihtzu"],
    ["Siberian Husky", "husky"],
    ["Smooth Fox Terrier", "terrier/fox"],
    ["Soft Coated Wheaten Terrier", "terrier/wheaten"],
    ["Poodle (Miniature)", "poodle/miniature"],
    ["Spanish Water Dog", "waterdog/spanish"],
    ["Wirehaired Vizsla", "vizsla"],
    ["Working Kelpie", "kelpie"],
]);

const LOCAL_IMG_MAPPING = new Map<string, any>([
    ["Alaskan Klee Kai", require("../assets/images/breeds/alaskan-klee-kai.jpg")],
]);
