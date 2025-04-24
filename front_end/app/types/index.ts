export interface Topic {
  id: number;
  title: string;
  content: string;
}

export interface Article {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
  topics: Topic[];
}
