export interface IFiltersLocalData {
  [filtersId: string]: {
    filters: {
      [filterId: string]: string | boolean
    }
    isShow: boolean
  }
}

export interface IFiltersLocalDataConfig {
  [filtersId: string]: {
    filters: IFilter[]
    isShow?: boolean
  }
}

export interface IFilter {
  id: string
  name: string
  type: 'select' | 'checkbox'
}
