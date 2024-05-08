import { V4Options, v4 } from 'uuid'
import { ISelectOption } from '../../../../components/Select/Select'

//1
// export interface IFiltersLocalData {
//   [filtersId: string]: {
//     filters: {
//       [filterId: string]: string | boolean
//     }
//     isShow: boolean
//   }
// }

//2
export interface IFiltersLocalData {
  [filtersId: string]: {
    filters: IFilterDataItem[]
    isShow: boolean
  }
}

export interface IFilterDataItem {
  id: string
  type: 'select' | 'checkbox'
  filterState: boolean | string
  label?: string
  optionsList?: ISelectOption[]
  value?: string
}

// 1
// const filters: IFiltersLocalData = {
//   posts: {
//     filters: {
//       userId: '1',
//       isHidden: true,
//     },
//     isShow: true,
//   },
//   comments: {
//     filters: {
//       hasReplyComments: true,
//     },
//     isShow: true,
//   },
// }

//2
// const filters: IFiltersLocalData = {
//   posts: {
//     filters: [{ id: v4(), type: 'checkbox', label: 'Show hidden', value: 'show hidden' }],
//     isShow: true,
//   },
// }
