import { IDate } from './Date'
import { ITime } from './Time'
import { IUser } from './User'

export interface IReplyComment {
  commentId: string
  id: string
  content: string
  picture: string
  owner: IUser
  date: IDate
  time: ITime
}
