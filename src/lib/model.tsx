export type Place = {
    id: string;
    name: string;
    facility?: string;
    category: string | null;
    position: number[];
};

export type Places = Place[];

export type Query = string | string[] | undefined;