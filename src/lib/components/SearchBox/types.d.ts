export interface ISearchBoxProps {
  onChange: (onChangeData: string) => void
  onClick: (onClickData: IOnclickData) => void
  results: ISearchResult[] | undefined
  limit?: number
  thresHold?: number
  placeHolder?: string
  showImage?: boolean
  darkMode?: boolean
  showDetail?: boolean
  sx?: {
    textColor?: string
    highlightColor?: string
    darkThemeColor?: string
    borderRadius?: BorderRadiusRange
    transitionDuraiton?: number
  }
  buttons?: [
    btn1?: { label: string, handler: (onChangeData: IOnClickData) => void },
    btn2?: { label: string, handler: (onChangeData: IOnClickData) => void },
  ]
}

export interface IProviderValues extends ISearchBoxProps {
  arr: ISearchResults[] | undefined
  setArr: React.Dispatch<React.SetStateAction<ISearchResults[] | undefined>>
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  tempVal: string
  setTempVal: React.Dispatch<React.SetStateAction<string>>
  active: number
  setActive: React.Dispatch<React.SetStateAction<number>>
  mainRef: React.RefObject<HTMLDivElement>
  inputRef: React.RefObject<HTMLInputElement>
  topRef: React.RefObject<HTMLDivElement>
  dropdownRef: React.RefObject<HTMLDivElement>

}

export interface ISearchBoxColors {
  text?: string
  highlightText?: string
  darkTheme?: string
}

export interface ISearchBoxButtons {
  [
    btn1?: { label: string, handler: (onChangeData: IOnClickData) => void },
    btn2?: { label: string, handler: (onChangeData: IOnClickData) => void },
  ]
}

export interface IButtonHandlers {
  label: string
  handler: (onClickData: IOnclickData) => void
}
export interface ISearchResults {
  id: number
  title: string
  image?: string
  href?: string
  detail?: string
}
export interface IOnClickData extends ISearchResult { }

export interface ISearchResultsProps extends Pick<ISearchBoxProps,
 'darkMode' | 'showImage' | 'showDetail' | 'buttons' | 'sx'
 > {
  arr: ISearchResults[] | undefined
  value: string
  dropdownRef: React.RefObject<HTMLDivElement>
  active: number
  isMobile: boolean
  handleOnClick: (onClickData: any) => void
  handleBtn: (fn?: Function) => void
}

type CreateArrayWithLengthX<
    LENGTH extends number,
    ACC extends unknown[] = [],
> = ACC['length'] extends LENGTH
    ? ACC
    : CreateArrayWithLengthX<LENGTH, [...ACC, 1]>

type NumericRange<
   START_ARR extends number[],
   END extends number,
   ACC extends number=never>
= START_ARR['length'] extends END
   ? ACC | END
   : NumericRange<[...START_ARR, 1], END, ACC | START_ARR['length']>

type BorderRadiusRange = NumericRange<CreateArrayWithLengthX<0>, 24>
