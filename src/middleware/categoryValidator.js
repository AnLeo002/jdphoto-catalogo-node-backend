const validateCategory = (req,res,next)=>{
  const {category} = req.body;

  if(typeof category != "string" || !category.trim()){
    return res.status(400).json({
      error:"Bad request",
      mensaje:"Asegurese de ingresar valores correctos"
    });
  }
  req.body.category = category.trim().toLowerCase();
  
  next();
}
export {
  validateCategory
}