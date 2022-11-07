import { ISearchResults } from '../components/SearchBox/types';

export const filterCondition = (param: ISearchResults, value: string): ISearchResults => {
  let output;
  if (param.title.toLowerCase().includes(value.toLocaleLowerCase())) {
    output = param;
  }
  return output as ISearchResults;
};
