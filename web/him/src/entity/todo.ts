export default class ITodo {
  id?: number
  content!: string
  isComplete!: number
  completeTime?: number
  updateTime!: number
  createTime!: number
}

export class Todo implements ITodo {
  id?: number
  content!: string
  isComplete!: number
  completeTime?: number
  updateTime!: number
  createTime!: number
}