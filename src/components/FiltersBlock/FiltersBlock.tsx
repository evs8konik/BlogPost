import React, { FC } from 'react'
import FiltersComponent from '../../modules/common/features/Filters/Filters'
import { IFiltersLocalDataConfig } from '../../modules/common/features/Filters/interfaces/FiltersLocalData/FiltersLocalData'

const postsFiltersConfig: IFiltersLocalDataConfig = {
  posts: {
    filters: [
      { id: 'byAlphabetId', name: 'Alphabet', type: 'select' },
      { id: 'byNewId', name: 'New', type: 'select' },
      { id: 'hiddenId', name: 'Hidden', type: 'checkbox' },
      { id: 'onlyUserPostId', name: 'Only user post', type: 'checkbox' },
    ],
    isShow: true,
  },
}

const FiltersBlock: FC = () => {
  return (
    <div>
      <h1>Filters Test</h1>
      <FiltersComponent
        filtersLocalDataConfig={postsFiltersConfig}
        filtersId="posts"
      />
    </div>
  )
}

export default FiltersBlock
