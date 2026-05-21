import type { WarrantyCase } from '../domain/case.js'
import type { Repository } from './repository.js'

const memoryCases: WarrantyCase[] = []

export class CaseRepository implements Repository<WarrantyCase> {
  async create(data: WarrantyCase) {
    memoryCases.push(data)
    return data
  }

  async list() {
    return memoryCases
  }

  async findById(id: string) {
    return memoryCases.find(item => item.id === id) ?? null
  }
}
