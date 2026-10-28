import {pool} from "../../config/db.js"

const createCategory = async (req,res)=>{
  const {category} = req.body;
  try{
    const [categories] = await pool.execute(
      "SELECT EXISTS (SELECT 1 FROM categories WHERE category = ?) AS categoryExist",[category]
    );
    if(categories[0].categoryExist){
      return res.status(409).json({
        error: "Conflict",
        mensaje:"La categoria ya se encuentra registrado en la base de datos"
      });
    }
    await pool.execute(
      "INSERT INTO categories (category) VALUES (?)",[category]
    );
    res.status(200).json({
      mensaje:"Categoria registrada correctamente"
    });
  }catch(e){
    console.error(e);
    res.status(500).json({
      error:"Error en el servidor"
    })
  }
}
const findCategoryByCategory = async (req,res)=>{
  const {category} = req.body;

  try{
    const [categories] = await pool.execute(
    "SELECT * FROM categories WHERE category = ?",[category]
  )
  const categoryFound = categories[0];
  if(!categoryFound) res.status(404).json({
    error:"Not found",
    mensaje:"La categoria no se encuentra en la base de datos"
  })
  res.status(200).json({
    mensaje:"Categoria encontrada",
    categoryFound
  })
  }catch(e){
    console.error(e);
    res.status(500).json({
      mensaje:"Error en el servidor"
    })
  }
}
const findAll = async (req,res)=>{
  try{
    const [categories] = await pool.execute(
      "SELECT * FROM categories"
    )
    if(categories.length === 0) res.status(404).json({
      error:"Not found",
      mensaje:"La base de datos se encuentra vacía"
    })
    res.status(200).json({
      categories
    })
  }catch(e){
    console.error(e);
    res.status(500).json({
      mensaje:"Error en el servidor"
    })
  }
}

export{
  createCategory,
  findCategoryByCategory,
  findAll
}