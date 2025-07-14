import axios_ from "../Api/axios";
const ARTICLE_API="articles"

//fetch Fonction pour récupérer tous les articles
export const fetcharticles=async()=> {
return await axios_.get(ARTICLE_API);
}

// recupére un seul artile par son id 
export const fetcharticleById=async(articleId)=> {
return await axios_.get(ARTICLE_API + '/' + articleId);
}
export const deletearticle=async(articleId) =>{
return await axios_.delete(ARTICLE_API + '/' + articleId);
}
export const addarticle=async(articles)=> {
return await axios_.post(ARTICLE_API, articles);
}
export const editarticle=(article) =>{
return axios_.put(ARTICLE_API + '/' + article._id, article);
}

export const fetcharticlesPagination=async(page,limit)=> {
return await axios_.get(ARTICLE_API + `/art/pagination?page=${page}&pageSize=${limit}`)
}