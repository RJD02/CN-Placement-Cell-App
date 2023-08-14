import { Document, FilterQuery, Model, PopulateOptions } from "mongoose";

interface IBaseDAL<T extends Document> {
  all(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: Document<T>): Promise<T | null>;
  find(query: FilterQuery<T>): Promise<T[]>;
  findAndPopulate(
    query: FilterQuery<T>,
    populate: PopulateOptions
  ): Promise<T[]>;
  deleteById(id: string): void;
}

class BaseDAL<T extends Document> implements IBaseDAL<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Document<T>): Promise<T | null> {
    return this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async all(): Promise<T[]> {
    return this.model.find();
  }

  async find(query: FilterQuery<T>) {
    return this.model.find(query);
  }

  async findAndPopulate(query: FilterQuery<T>, populate: PopulateOptions) {
    return this.model.find(query).populate(populate);
  }

  deleteById(id: string): void {
    this.model.findOneAndDelete({ _id: id });
  }
}

export default BaseDAL;
