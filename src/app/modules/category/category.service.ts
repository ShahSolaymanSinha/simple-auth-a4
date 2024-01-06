import ICategory from './category.interface';
import Category from './category.model';

const createCategoryIntoDB = async (categoryData: ICategory) => {
  const result = await Category.create(categoryData);
  return result;
};

const retrieveAllCategoryFromDB = async () => {
  const result = await Category.aggregate([
    {
      $lookup: {
        from: 'users', // Assuming the users collection is named "users"
        localField: 'createdBy', // Field in the current collection
        foreignField: '_id', // Field in the users collection
        as: 'createdBy',
      },
    },
    {
      $project: {
        'createdBy.password': 0,
        'createdBy.createdAt': 0,
        'createdBy.updatedAt': 0,
      },
    },
  ]);
  return result;
};

const categoryService = {
  createCategoryIntoDB,
  retrieveAllCategoryFromDB,
};

export default categoryService;
