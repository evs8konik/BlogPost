import { IDate, ITime, IUser } from '../../../../components/CommentForm/CommentForm'

export interface IPost {
  userId: string
  id: string
  title: string
  body: string
  owner?: IUser
  date?: IDate
  time?: ITime
  picture?: string
  commentIdList?: string[]
}
