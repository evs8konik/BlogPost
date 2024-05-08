import React, { FC } from 'react'
import Filters from '../../modules/common/features/Filters/Filters/Filters'
import { IFiltersLocalData } from '../../modules/common/features/Filters/interfaces/FiltersLocalData/FiltersLocalData'
import { v4 } from 'uuid'

const filterConfigData: IFiltersLocalData = {
  posts: {
    filters: [
      {
        id: v4(),
        type: 'select',
        filterState: 'Sort none',
        optionsList: [
          { label: 'Sort none', value: 'Sort none' },
          { label: 'Sort A-Z', value: 'az' },
          { label: 'Sort Z-A', value: 'za' },
        ],
      },
      {
        id: v4(),
        type: 'select',
        filterState: 'Sort none',
        optionsList: [
          { label: 'Sort none', value: 'Sort none' },
          { label: 'Sort by new', value: 'new' },
          { label: 'Sort by old', value: 'old' },
        ],
      },
      { id: v4(), type: 'checkbox', label: 'Show hidden', value: 'show hidden', filterState: false },
      { id: v4(), type: 'checkbox', label: 'Show only my posts', value: 'show hidden', filterState: false },
    ],
    isShow: true,
  },
}

const FiltersBlock: FC = () => {
  return (
    <div>
      <Filters
        filtersConfig={filterConfigData}
        filterKey={'posts'}
      />
    </div>
  )
}

export default FiltersBlock
