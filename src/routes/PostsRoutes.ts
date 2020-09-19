import { Request, Response, Router } from 'express';

import Post from '../models/Post';

class PostRoutes {
    
    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    async getPosts(req: Request, res: Response){
        const posts = await Post.find();
        res.json(posts);
    }

    async getPost(req: Request, res: Response){
        const post = await Post.find({url: req.params.url});
        res.json(post);
    }

    async createPost(req: Request, res: Response){
        const { title, url, content, image } = req.body;
        const newPost = new Post({title, url, content, image});
        await newPost.save();
        res.json({ data: newPost });

    }

    updatePost(){

    }

    deletePost(){

    }

    routes(){
        this.router.get('/', this.getPosts);
        this.router.get('/:url', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:url', this.updatePost);
        this.router.delete('/:url', this.deletePost);
    }
}

const postRoutes = new PostRoutes();
export default postRoutes.router;