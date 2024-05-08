import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TRootState } from '../../../../../../app/store'
import { IFiltersLocalData, IFilterDataItem } from '../../interfaces/FiltersLocalData/FiltersLocalData'

interface IFiltersReduxState {
  [filtersId: string]: {
    filters: IFilterDataItem[]
    isShow: boolean
  }
}

interface UpdateFilterStatePayload {
  filtersId: string
  filterId: string
  newState: boolean | string
}

const initialState: IFiltersReduxState = {}

const FiltersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addFilter(
      state,
      action: PayloadAction<{
        filtersId: string
        newFilters: IFilterDataItem[]
        isShow: boolean
      }>,
    ) {
      const { filtersId, newFilters, isShow } = action.payload

      state[filtersId] = {
        filters: newFilters,
        isShow,
      }
    },

    addFilters(state, action: PayloadAction<IFiltersLocalData>) {
      const filtersData = action.payload
      Object.keys(filtersData).forEach((filtersId) => {
        const { filters, isShow } = filtersData[filtersId]
        state[filtersId] = {
          filters,
          isShow,
        }
      })
    },

    // updateFilterState(
    //   state,
    //   action: PayloadAction<{  filterIndex: number; newState: boolean | string }>,
    // ) {
    //   state.
    //   const { filtersId, filterIndex, newState } = action.payload
    //   const filterGroup = state[filtersId]
    //   if (filterGroup && filterGroup.filters[filterIndex]) {
    //     filterGroup.filters[filterIndex].filterState = newState
    //   }
    // },
  },
})

export const selectFilters = (state: TRootState) => {
  return state.filters
}

export const FiltersActions = FiltersSlice.actions

const FiltersReducer = FiltersSlice.reducer

export default FiltersReducer
