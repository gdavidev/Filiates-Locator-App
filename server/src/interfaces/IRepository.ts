export default interface IRepository<T> {
    getAll(): Promise<T[]>;
    get(id: number | string): Promise<T>;
    save(value: T): Promise<void>;
    update(value: T): Promise<void>;
    delete(id: number | string): Promise<void>;
    ensureCreated(): void;
}