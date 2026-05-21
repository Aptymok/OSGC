export interface Repository<T> {
  create(data: T): Promise<T>
  list(): Promise<T[]>
  findById(id: string): Promise<T | null>
}
