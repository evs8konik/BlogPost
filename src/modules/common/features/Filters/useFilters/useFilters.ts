import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { IFiltersLocalData } from '../interfaces/FiltersLocalData/FiltersLocalData'
import { useAppSelector } from '../../../../../app/hooks'
import {
  initialFiltersState,
  selectFiltersState,
  addFiltersState,
  updateFilterState,
} from '../../../../store/reducers/FiltersState.slice'

const STORAGE_KEY = 'filtersState'

interface IStoredFilters {
  filters: IFiltersLocalData
}

const getStoredFilters = (): IFiltersLocalData => {
  const storedData = localStorage.getItem(STORAGE_KEY)

  if (!storedData) return {}

  const { filters: storedFilters } = JSON.parse(storedData) as IStoredFilters

  return storedFilters
}

const saveFilters = (newFilters: IFiltersLocalData): void => {
  const storedData: IStoredFilters = { filters: { ...newFilters } }

  const formattedStoreData = JSON.stringify(storedData)

  localStorage.setItem(STORAGE_KEY, formattedStoreData)
}

const useFiltersTest = () => {
  const dispatch = useDispatch()

  const filtersState = useAppSelector(selectFiltersState)

  useEffect(() => {
    const storedFilters = getStoredFilters()
    if (Object.keys(storedFilters).length > 0) {
      dispatch(addFiltersState(storedFilters))
    }
  }, [])

  // const initialFiltersState = (filtersId: string, newFilters: IFilterDataItem[], isShow: boolean) => {
  //   dispatch(FiltersActions.addFilter({ filtersId, newFilters, isShow }))

  //   saveFilters(filtersState)
  // }

  // const updateFilter = (filtersId: string, filterId: string, newState: boolean | string) => {
  //   dispatch(updateFilterState(filtersId, filterId, newState))

  //   saveFilters(filtersState)
  // }

  const updateFilter = (payload: { filtersId: string; filterId: string; newState: string | boolean }): void => {
    dispatch(updateFilterState(payload))
    saveFilters(filtersState)
  }

  return { initialFiltersState, updateFilter }
}

export default useFiltersTest
