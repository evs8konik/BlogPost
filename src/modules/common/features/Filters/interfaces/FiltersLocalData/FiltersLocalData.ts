// export interface IFiltersLocalData {
//   [filtersId: string]: {
//     filters: {
//       [filterId: string]: string | boolean
//     }
//     isShow: boolean
//   }
// }

export interface IFiltersLocalData {
  [filtersId: string]: {
    filters: {
      [filterId: string]: IFilter
    }

    selectedValues: {
      [filterId: string]: string | boolean
    }

    applyValues: {
      [filterId: string]: string | boolean
    }
  }
}

export interface IFiltersConfig {
  [filtersId: string]: {
    filters: IFilter[]
  }
}

export interface IFilter {
  id: string
  name: string
  type: 'select' | 'checkbox'
}
