import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  IFilter,
  IFiltersLocalDataConfig,
  IFiltersLocalData,
} from '../../common/features/Filters/interfaces/FiltersLocalData/FiltersLocalData'
import { TRootState } from '../../../app/store'

const initialState: { filtersState: IFiltersLocalData; filtersConfig: IFiltersLocalDataConfig } = {
  filtersState: {},
  filtersConfig: {},
}

const FiltersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    initialFiltersState: (state, action: PayloadAction<IFiltersLocalDataConfig>) => {
      Object.keys(action.payload).forEach((filtersId) => {
        state.filtersState[filtersId] = {
          filters: {},
          isShow: action.payload[filtersId].isShow ?? true,
        }

        action.payload[filtersId].filters.forEach(function (filter) {
          let initialValue: string | boolean = ''

          if (filter.type === 'select') {
            initialValue = ''
          } else if (filter.type === 'checkbox') {
            initialValue = false
          }
          state.filtersState[filtersId].filters[filter.name] = initialValue
        })
      })
    },

    updateFilterState: (
      state,
      {
        payload: { filtersId, filterId, newState },
      }: PayloadAction<{ filtersId: string; filterId: string; newState: boolean | string }>,
    ) => {
      if (state.filtersState[filtersId]) {
        state.filtersState[filtersId].filters[filterId] = newState
      }
    },

    addFiltersState(state, action: PayloadAction<IFiltersLocalData>) {
      const filtersData = action.payload
      Object.keys(filtersData).forEach((filtersId) => {
        const { filters, isShow } = filtersData[filtersId]
        state.filtersState[filtersId] = {
          filters,
          isShow,
        }
      })
    },

    initialFiltersConfig: (state, action: PayloadAction<IFiltersLocalDataConfig>) => {
      state.filtersConfig = action.payload
    },
  },
})

export const selectFiltersState = (state: TRootState) => state.filters.filtersState
export const selectFiltersConfig = (state: TRootState) => state.filters.filtersConfig

export const { initialFiltersState, updateFilterState, addFiltersState, initialFiltersConfig } = FiltersSlice.actions

const FiltersReducer = FiltersSlice.reducer

export default FiltersReducer
