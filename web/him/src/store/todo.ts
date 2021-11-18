import ITodo, { Todo } from "../entity/todo"
import Dexie from "dexie"

class TodoStore {
  /**
   * 数据库实例
   */
  db: Dexie

  /**
   * todo表
   */
  todoTable: Dexie.Table<ITodo, number>;

  constructor() {
    this.db = new Dexie("TodoDb");
    this.db.version(1).stores({
      todo: "++id, isComplete, completeTime, createTime"
    })
    this.todoTable = this.db.table('todo')
  }

  /**
   * 获取todo
   * @param id todo编号
   * @returns todo
   */
  public async getTodo(id: number): Promise<Todo | undefined> {
    return this.todoTable.get(id)
  }

  /**
   * 获取完成的todo
   * @param page 页码
   * @param step 条数
   * @returns 完成的todo
   */
  public async getCompleteTodos(page: number, step: number): Promise<Array<Todo>> {
    return this.todoTable.where('isComplete').equals(1).reverse().sortBy('completeTime')
  }

  /**
   * 获取未完成的todo
   * @param page 页码
   * @param step 条数
   * @returns 未完成的todo
   */
  public getUncompleteTodos(page: number, step: number): Promise<Array<Todo>> {
    return this.todoTable.where('isComplete').equals(0).sortBy('createTime')
  }

  /**
   * 更新todo内容
   * @param id todo编号
   * @param content 内容
   * @returns 更新的行数
   */
  public updateContent(id: number, content: string): Promise<number> {
    return this.todoTable.update(id, {
      content: content,
      updateTime: new Date().getTime(),
    })
  }

  /**
   * 重新todo
   * @param id todo编号
   * @returns 更新的行数
   */
  public reTodo(id: number): Promise<number> {
    const now = new Date().getTime()
    return this.todoTable.update(id, {
      isComplete: Number(0),
      completeTime: now,
      updateTime: now,
    })
  }

  /**
   * 完成todo
   * @param id todo编号
   * @returns 更新的行数
   */
  public completeTodo(id: number): Promise<number> {
    const now = new Date().getTime()
    return this.todoTable.update(id, {
      isComplete: Number(1),
      completeTime: now,
      updateTime: now,
    })
  }

  /**
   * 删除todo
   * @param id todo编号
   */
  public deleteTodo(id: number): Promise<void> {
    return this.todoTable.delete(id)
  }

  /**
   * 添加todo
   * @param content todo内容
   * @returns 记录的id
   */
  public addTodo(content: string): Promise<number> {
    const now = new Date().getTime()
    return this.todoTable.add({
      content: content,
      isComplete: Number(0),
      updateTime: now,
      createTime: now
    })
  }
}

let todoStore: TodoStore = new TodoStore()

export default todoStore