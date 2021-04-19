import connectDB from '../../../utils/connectDB'
import Products from '../../../models/productModel'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProduct(req, res)
            break;
        case "PUT":
            await updateProduct(req, res)
            break;
        case "DELETE":
            await deleteProduct(req, res)
            break;
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.query;

        const product = await Products.findById(id)
        if(!product) return res.status(400).json({err: 'This product does not exist.'})
        
        res.json({ product })

    } catch (err) {
        return res.status(500).json({err: 'Sorry. Please Login Again or Contact Us!'})
    }
}

const updateProduct = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') 
        return res.status(400).json({err: 'Authentication is not valid.'})

        const {id} = req.query
        const {title, seller, price, inStock, description, category, images} = req.body

        if(!title || !seller || !price || !inStock || !description || images.length === 0 )
        return res.status(400).json({err: 'Please add all the fields.'})

        await Products.findOneAndUpdate({_id: id}, {
            title: title.toLowerCase(), seller: seller.toLowerCase(), price, inStock, description, category, images
        })

        res.json({msg: 'Success! Updated a product'})
    } catch (err) {
        return res.status(500).json({err: 'Sorry. Please Login Again or Contact Us!'})
    }
}

const deleteProduct = async(req, res) => {
    try {
        const result = await auth(req, res)
        
        if(result.role !== 'admin') 
        return res.status(400).json({err: 'Authentication is not valid.'})

        const {id} = req.query

        await Products.findByIdAndDelete(id)
        res.json({msg: 'Successfully Deleted Product/Products.'})

    } catch (err) {
        return res.status(500).json({err: 'Sorry. Please Login Again or Contact Us!'})
    }
}