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
        return LOCAL_IMG_MAPPING.get(name);
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
    ["Alaskan Klee Kai", "https://upload.wikimedia.org/wikipedia/commons/5/54/WOWAKK-Kukai-Alaskan-Klee-Kai.jpg"],
    ["American English Coonhound", "https://georgiapuppiesfromheaven.com/dog-breed-photos/ameengco.jpg"],
    ["American Foxhound", "https://www.karusek.com.pl/poradnik/wp-content/uploads/sites/3/2021/09/shutterstock_1939375954.jpg"],
    ["American Hairless Terrier","https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSk4ySSvBDU2585xRg7Tykty9avSfhN8NIKV92fED_uFYnKHCSMWeqi0EV1d2FY3JIFwwkpBMIQLths3w0P78NWsg"],
    ["American Leopard Hound","https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSlEb2Vy_LR28MDTMAFO5z5Cwd7y9MFmxKOTGM7MUHJd1LweSAAPBTv12iS4n_2k3HjoEPPQeeRP18NpYCxtc1a2g"],
    ["American Staffordshire Terrier","https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSxzuW0uYebuApU_vk3wdADC1Uge5F42C1_Uss-fPMDo5n_BRT-Tp20jcTS4x5b2a21ZHohBARZPSY8B1nH1es5Tw"],
    ["American Water Spaniel","https://content.osgnetworks.tv/gundog/content/photos/American_water_spaniel_breed-1-840.jpg"],
    ["Anatolian Shepherd Dog","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGva_CC1rdeleoxjxpbNSfvzyYkz-HRqGh8we1iQr9BmFwhDeO0KWJ3A_4jFOnXILnNr9mh7QuGSQhUA0TRtHItw"],
    ["Appenzeller Sennenhund","https://www.zooplus.ch/magazin/wp-content/uploads/2018/09/AdobeStock_11176163.jpg"],
    ["Australian Cattle Dog","https://epieski.pl/wp-content/uploads/2024/07/australian-cattle-dog-1024x805.jpg.webp"],
    ["Australian Shepherd","https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSKhe18mz_0MfS7qIY_BbfheWFxi1sTYcCzh5q0UOLgNF9CffYWtWPmQN7w9PWT-Zenmf3kPxbT-B4D7Z108BAr5Q"],
    ["Australian Stumpy Tail Cattle Dog","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaeLkwWiarsKvCcCNZXee4tAVxKK57T5GdDQ&s"],
    ["Azawakh","https://epieski.pl/wp-content/uploads/2024/06/azawakh-1024x856.jpg.webp"],
    ["Barbado da Terceira","https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRTqA96VNPDT3xkleKUUG9hMs94s7t6DOA5m-7TUE_58N8XU1WFvchjnikceRYpGWntEvn_QVRIE87w5A7VvDWycg"],
    ["Barbet","https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQdLo_E8GwndMpbyvb2-W5LPS7gs4lhojfkefY4ZSJunyOFz03Im1dO6MX4NclmkUczaPDWLpbu-bAdUqpUYc1ltw"],
    ["Basset Fauve de Bretagne","https://www.akc.org/wp-content/uploads/2017/11/AdobeStock_23183632.jpg"],
    ["Bavarian Mountain Scent Houn","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNJ_xb-vQ4pV5mjApoTE9B9KaWnuzbHRVWzU-JFSdrMOJNYq5FmB2CCAzO_ghIp6wANtIbd6kGrpalxvTz6QlciA"],
    ["Bearded Collie","https://zooart.com.pl/blog/wp-content/uploads/2022/07/FOTO-BEARDED-COLLIE-SYLWETKA-1000x667-1.jpg"],
    ["Beauceron","https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR58VNjmd6yiBVEXkRXUQ0qaThxfyizC-aGylDTpLiYUsOSNxXo8qvqqYefsyu6ydP2mwrYdiFRf6gt-9yi4lJP0w"],
    ["Belgian Laekenois","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRjWq_GhFbj2X0kXqoG9YO9TVmc6J-q7_mqQ&s"],
    ["Belgian Sheepdog","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt04a_295qKJlnGTdweeHhVW__gb5_Fc4Ot-qD6X3RYgPalshAnixbn8tP5qjiY_nn_HotEqKZ46voiNgLCOndTQ"],
    ["Bergamasco Sheepdog","https://www.dogpackapp.com/blog/wp-content/uploads/2024/10/bergamasco-sheepdog-field.webp"],
    ["Berger Picard","https://www.akc.org/wp-content/uploads/2017/11/Berger-Picard-standing-in-a-field.jpg"],
    ["Biewer Terrier","https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT8ueEjVHpkLS-8CaDxcisaW6F8oDF2qkVmF-umNtZT9NCGY9sOKsDln_k3unfpv-30Fz9cwKj0MdrenpzcnF292g"],
    ["Black and Tan Coonhound","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqFa8duJclNYz6LIirpeVl7BFPBqWeS29sHw&s"],
    ["Black Russian Terrier","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrPJxWcjdJTfO2CD38qsI2s-PlIYuOpgG0EQ&s"],
    ["Bloodhound","https://zooart.com.pl/blog/wp-content/uploads/2022/09/BLOODHOUND-1000X667.jpg"],
    ["Bluetick Coonhound","https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSfaYz996oBKoIgZilHhlB-t_gAviYp3UXl4o5bHtKrc5n1QbWe-LaCf6IossjQ_VYVUvnf9Fyj-OgJSzif2nSpXg"],
    ["Boerboel","https://pl.petglobals.com/imagesaver/iblockdefault/big/fpyjhzhigproh3csxury_1587381588.jpg"],
    ["Bohemian Shepherd","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqfANNtJl-YZg2tkoQtzhqNCfNgjpu1zFOe7KspjCesJTeMEaEvqFjg59tlzqx7G1sLpDiyeZOXiLv78U7hqcRqQ"],
    ["Bolognese","https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTJ6780vOIApaP0Jp4tgxPEyfQLiYxgpyc1St3o4T4p5CXuXj2ij1eu-hjdo1RbAgprcnztHFty4wfeQYnqn1irUG0cVzOEbET9AtixBXQ"],
]);
