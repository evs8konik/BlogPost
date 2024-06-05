import { useEffect } from 'react'
import { IFiltersLocalData } from '../interfaces/FiltersLocalData/FiltersLocalData'
import { useDispatch } from 'react-redux'
import {
  addFilters,
  appliesFilterValue,
  selectFilters,
  selectedFilterValue,
} from '../../../../store/reducers/FiltersState.slice'
import { useAppSelector } from '../../../../../app/hooks'

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

  const filters = useAppSelector(selectFilters)

  useEffect(() => {
    const storedFilters = getStoredFilters()

    if (Object.keys(storedFilters).length > 0) {
      dispatch(addFilters(storedFilters))
    }
  }, [])

  const updateFilter = (payload: { filtersId: string; filterId: string; newState: string | boolean }): void => {
    dispatch(selectedFilterValue(payload))
    saveFilters(filters)
  }

  const applyFilterValue = (payload: { filtersId: string; filterId: string; newState: string | boolean }): void => {
    dispatch(appliesFilterValue(payload))
    saveFilters(filters)
  }

  return { filters, updateFilter, applyFilterValue }
}

export default useFiltersTest
