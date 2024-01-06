/* eslint-disable @typescript-eslint/no-explicit-any */
import Review from '../review/review.model';
import ICourse from './course.interface';
import Course from './course.model';

const createCourseIntoDB = async (courseData: ICourse) => {
  const result = await Course.create(courseData);
  return result;
};

const updateCourseIntoDB = async (id: string, data: any) => {
  const tags: any = await Course.findById(
    { _id: id },
    {
      tags: 1,
    },
  );

  // eslint-disable-next-line no-unsafe-optional-chaining
  const combinedTags = [...tags.tags, ...(data?.tags || '')];

  // Handled Tags Modification.
  const uniqueItemsMap = new Map();
  combinedTags.forEach((item) => {
    const key = item.name;
    if (uniqueItemsMap.has(key)) {
      if (!item.isDeleted) {
        uniqueItemsMap.set(key, { name: item.name, isDeleted: false });
      } else if (
        item.isDeleted &&
        uniqueItemsMap.get(key).isDeleted === false
      ) {
        uniqueItemsMap.delete(key);
      }
    } else {
      uniqueItemsMap.set(key, { name: item.name, isDeleted: false });
    }
  });

  const modifiedArray = Array.from(uniqueItemsMap.values());

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const result: any = await Course.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        title: data?.title,
        instructor: data?.instructor,
        categoryId: data?.categoryId,
        price: data?.price,
        tags: modifiedArray,
        startDate: data?.startDate,
        endDate: data?.endDate,
        language: data?.language,
        provider: data?.provider,
        'details.level': data?.details?.level,
        'details.description': data?.details?.description,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  ).populate({ path: 'createdBy', select: '_id username role email' });

  return result;
};

const getCourseWithReviewFromDB = async (id: string) => {
  const course = await Course.find({ _id: id });
  const review = await Review.find({ courseId: id });
  const courseObj: Record<string, any> = course[0];

  const result = {
    course: { ...courseObj['_doc'] },
    review: review,
  };
  return result;
};

const getBestCourseFromDB = async () => {
  const averageReview = await Review.aggregate([
    {
      $group: {
        _id: '$courseId',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
    {
      $sort: {
        averageRating: -1,
      },
    },
  ]);
  const bestCourse = averageReview[0];
  const bestCourseObj: any = await Course.findOne({ _id: bestCourse._id });
  const result = {
    course: { ...bestCourseObj['_doc'] },
    averageRating: bestCourse?.averageRating,
    reviewCount: bestCourse?.reviewCount,
  };

  return result;
};

const getAllCourse = async (searchQuery: any) => {
  const {
    page = 1,
    limit = 10,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    level,
  } = searchQuery;

  const pipeline: any[] = [];

  // Filtering Course Data
  const matchStage: Record<string, any> = {};

  if (minPrice !== undefined && maxPrice !== undefined) {
    matchStage.price = {
      $gte: parseFloat(minPrice),
      $lte: parseFloat(maxPrice),
    };
  }
  if (tags) {
    matchStage['tags.name'] = tags;
  }
  if (startDate && endDate) {
    matchStage.startDate = {
      $gte: startDate,
      $lte: endDate,
    };
  }
  if (language) {
    matchStage.language = language;
  }
  if (provider) {
    matchStage.provider = provider;
  }
  if (durationInWeeks !== undefined) {
    matchStage.durationInWeeks = durationInWeeks;
  }
  if (level) {
    matchStage['details.level'] = level;
  }

  if (Object.keys(matchStage).length > 0) {
    pipeline.push({ $match: matchStage });
  }

  // Sorting Course Data
  const sortStage: Record<string, any> = {};

  if (sortBy) {
    sortStage[sortBy] = sortOrder === 'desc' ? -1 : 1;
    pipeline.push({ $sort: sortStage });
  }

  // Skip and Limit
  pipeline.push({ $skip: (page - 1) * limit });
  pipeline.push({ $limit: parseInt(limit, 10) });

  // Executing aggregation
  const aggregation = Course.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'createdBy',
        foreignField: '_id',
        as: 'createdBy',
      },
    },
    {
      $unwind: '$createdBy',
    },
    {
      $project: {
        'createdBy.password': 0,
        'createdBy.createdAt': 0,
        'createdBy.updatedAt': 0,
      },
    },
    ...pipeline,
  ]);

  const result = await aggregation.exec();

  // Counting total documents for pagination
  const totalCourses = await Course.countDocuments(matchStage);

  const usefulData = {
    data: result,
    totalCourses,
    page,
    limit,
  };

  return usefulData;
};

const courseService = {
  createCourseIntoDB,
  getAllCourse,
  updateCourseIntoDB,
  getCourseWithReviewFromDB,
  getBestCourseFromDB,
};

export default courseService;
