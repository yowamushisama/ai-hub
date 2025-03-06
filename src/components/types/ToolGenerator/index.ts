export interface Tone {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export interface LengthOption {
  id: string;
  label: string;
  words: string;
}
export interface TitleOption {
  value: number;
  label: string;
}

export interface Title {
  id: number;
  text: string;
}
