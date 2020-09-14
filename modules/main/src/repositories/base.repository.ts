import { HasId, Identifier } from "@replikit/core/typings"

export abstract class RepositoryBase<T extends HasId> {
  /**
   * Contains all items
   */
  private readonly _items: T[] = []

  /**
   * Returns all items
   */
  public get all(): T[] { return this._items }

  /**
   * Returns count of items
   */
  public get length(): number { return this._items.length }

  /**
   *
   * @param items
   */
  public constructor(...items: T[]) {
    this._items = items
  }

  /**
   * Gets item by id
   * @param id
   */
  public get(id: Identifier): T | undefined {
    return this._items.find(item => item.id === id)
  }

  /**
   * Adds new item to repository
   * @param item
   */
  public add(item: T): T {
    this._items.push(item)
    return item
  }

  /**
   * Removes item from repository
   * @param id
   */
  public remove(id: Identifier): boolean {
    const index = this._items.findIndex(game => game.id === id)
    if (index === -1) return false

    this._items.splice(index, 1)
    return true
  }

  /**
   * Checks if repository contains item
   * @param id
   */
  public contains(id: Identifier): boolean {
    return this._items.some(game => game.id === id)
  }

  /**
   * Checks if repository contains item
   * @param predicate
   */
  public has(predicate: (item: T, index: number, array: T[]) => boolean): boolean {
    return this._items.some(predicate)
  }
}