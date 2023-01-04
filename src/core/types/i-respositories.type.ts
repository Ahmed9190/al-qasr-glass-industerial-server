import { Repository } from 'typeorm';
import Branches from '../enums/branch.enum';

type IRepositories<T> = {
  [name in Branches]: Repository<T>;
};

export default IRepositories;
