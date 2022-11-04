export interface SearchBoxProps {
  onChange: (onChangeData: string) => void
  onClick: (onClickData: IOnclickData) => void
  results: ISearchResult[] | undefined
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
export interface ISearchResult {
  id: number
  title: string
  image?: string
  href?: string
  detail?: string
}
export interface IOnClickData extends ISearchResult { }
