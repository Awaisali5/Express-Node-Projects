const Product = require("../models/product");

const getAllProductsStatic = async (req, res, next) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .select("price")
    .limit(4)
    .skip(1);
  res.status(200).json({ products, nbHits: products.length });
};

// regex is use to match the pattern

const getAllProducts = async (req, res, next) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;

  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEx = /\b(<|>|>=|<=|=)\b/g
    let filters = numericFilters.replace(regEx,(match) => `-${operatorMap[match]}-`);

    const options = ['price', 'rating'];
    filters= filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-')
      if(options.includes(field)){
        queryObject[field] = {[operator]:Number(value)}
      }
    })

    
  }

  console.log(queryObject)

  let result = Product.find(queryObject);

  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createAt");
  }

  // select
  if (fields) {
    const fieldList = fields.split(",").join("");
    result = result.select(fieldList);
  }

  // limit  and pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  // total product 23
  // if the page num is 4 page 7 7 7 2

  const products = await result;

  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
