import {ITags} from './ITags';

export interface IQuestion {
    $key?: string | null;
    date: number;
    author: string | null | undefined;
    title: string;
    textarea: string;
    tags: ITags[];
}
