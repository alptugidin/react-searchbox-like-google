export interface ISearchBoxProps {
  onChange: (onChangeData: string) => void
  onClick: (onClickData: IOnclickData) => void
  results: ISearchResult[] | undefined
  isAsync?: boolean
  limit?: number
  thresHold?: number
  placeHolder?: string
  showImage?: boolean
  darkMode?: boolean
  showDetail?: boolean
  duration?: number
  breakPoint?: number
  colors?: ISearchBoxColors
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
 'darkMode' | 'showImage' | 'showDetail' | 'buttons' | 'colors'
 > {
  arr: ISearchResults[] | undefined
  value: string
  dropdownRef: React.RefObject<HTMLDivElement>
  active: number
  isMobile: boolean
  isAsync?: boolean
  filterLen: number
  handleOnClick: (onClickData: any) => void
  handleBtn: (fn?: Function) => void
  filterCondition: (param: ISearchResults, value: string) => any
}
