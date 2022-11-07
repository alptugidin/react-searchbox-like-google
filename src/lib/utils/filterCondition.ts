import { ISearchResults } from '../components/SearchBox/types';

export const filterCondition = (param: ISearchResults, value: string): any => {
  if (param.title.toLowerCase().includes(value.toLocaleLowerCase())) {
    return param;
  }
};
