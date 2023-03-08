interface PostI {
  id: string;
  title: string;
  body: string;
}

interface RMResponseI {
  info: RMPagesI;
  results: RMCharacterI[];
}

interface RMPagesI {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface RMCharacterI {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export type { PostI, RMCharacterI, RMPagesI, RMResponseI };
