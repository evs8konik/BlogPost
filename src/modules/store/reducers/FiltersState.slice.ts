import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  IFiltersConfig,
  IFiltersLocalData,
} from '../../common/features/Filters/interfaces/FiltersLocalData/FiltersLocalData'
import { TRootState } from '../../../app/store'

interface IFiltersReduxState {
  filters: IFiltersLocalData
}

const initialState: IFiltersReduxState = {
  filters: {},
}

const FiltersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    initialFilters: (state, action: PayloadAction<IFiltersConfig>) => {
      Object.keys(action.payload).forEach((filtersId) => {
        state.filters[filtersId] = {
          filters: {},
          applyValues: {},
          selectedValues: {},
        }

        action.payload[filtersId].filters.forEach((filter) => {
          let initialValue: string | boolean = ''

          if (filter.type === 'select') {
            initialValue = ''
          } else if (filter.type === 'checkbox') {
            initialValue = false
          }

          state.filters[filtersId].filters[filter.id] = filter
          state.filters[filtersId].selectedValues[filter.id] = initialValue
          state.filters[filtersId].applyValues[filter.id] = initialValue
        })
      })
    },

    selectedFilterValue: (
      state,
      {
        payload: { filtersId, filterId, newState },
      }: PayloadAction<{ filtersId: string; filterId: string; newState: boolean | string }>,
    ) => {
      if (state.filters[filtersId]) {
        state.filters[filtersId].selectedValues[filterId] = newState
      }
    },

    appliesFilterValue: (
      state,
      {
        payload: { filtersId, filterId, newState },
      }: PayloadAction<{ filtersId: string; filterId: string; newState: boolean | string }>,
    ) => {
      if (state.filters[filtersId]) {
        state.filters[filtersId].applyValues[filterId] = newState
      }
    },

    addFilters: (state, action: PayloadAction<IFiltersLocalData>) => {
      const filtersData = action.payload
      Object.keys(filtersData).forEach((filtersId) => {
        const { filters, applyValues, selectedValues } = filtersData[filtersId]
        state.filters[filtersId] = {
          filters,
          applyValues,
          selectedValues,
        }
      })
    },
  },
})

export const selectFilters = (state: TRootState) => state.filters.filters

export const { initialFilters, selectedFilterValue, appliesFilterValue, addFilters } = FiltersSlice.actions

const FiltersReducer = FiltersSlice.reducer

export default FiltersReducer
