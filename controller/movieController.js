const Movie = require("../Models/movieSchema");

const createMovie = async( req, res)=>{
        try {
              const movie = await Movie.create(req.body);{
               res.status(200).json({Movie,message:"movie list created"});
             }
            } catch(error){
                return res.status(500).json({message:"failed to create movie", error:error.message});
             };

}

const getAllMovies= async (req, res)=>{
    try {
        const movies= await Movie.find();
        res.json(movies);
    } catch (error) {
        return res.status(500).json({message:"failed to fetch movie:", error: error.message});
        
    }
}

const moviefindbyid= async (req, res)=>{
    try {
        const movies = await Movie.findById(req.params.id);
        if(!movies)
            return res.status(400).json(
            {message:"Movie not found"}
        )
    

        return res.json(movies);
        } catch (error) {
            return res.status(500).json({message:" failed to fetch movie ", error: error.message});
        
    }
};

const updateMovie= async (req, res)=>{
    try {
        const movie= await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(movie)
    } catch (error) {
       return res.status(500).json({messge:"internal server error", error:err.message});      
    }
};

const deleteMovie = async (req , res)=>{
       try {
           const movie = await Movie.findByIdAndDelete(req.params.id);
           return res.status(200).json({message: " Movie delete successfully"});   

       } catch (error) {
        return res.status(500).json({message:"failed to delete movie",error: err.message});
        }
};

const addReview = async (req, res)=>{
             try {
                const { username, rating, comment}=req.body;
                const movie = await Movie.findById(req.params.id);
                if(!movie){
                    return req.status(400).json({message: "movie not found"});
                }
                movie.review.push({username, rating, comment});          
               await movie.save();
                res.status(200).json({message:" add review succesfully "});
             } catch (error) {
                return res.status(500).json({message: "failed to review added or something went wrong", error: error.message})
                
             }
}
module.exports= {
    createMovie,
    getAllMovies,
    moviefindbyid,
    updateMovie,
    deleteMovie,
    deleteMovie,
    addReview }
