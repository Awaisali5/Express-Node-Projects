const Product = require("../models/product");

const getAllProductsStatic = async (req, res, next) => {
  const products = await Product.find({}).select('name price')
  res.status(200).json({ products, nbHits: products.length });
};

// regex is use to match the pattern

const getAllProducts = async (req, res, next) => {
  const { featured, company, name, sort , fields } = req.query;

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

  // console.log(queryObject)

  let result = Product.find(queryObject);

  // sort 
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList)
  }else {
    result = result.sort('createAt')
  }

  // select 
if(fields){
  const fieldList = fields.split(',').join('');
  result = result.select(fieldList)
}

// limit 


  const products = await result;

  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
