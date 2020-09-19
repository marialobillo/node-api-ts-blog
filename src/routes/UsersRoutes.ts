import { Request, Response, Router } from 'express';

import User from '../models/User';

class UserRoutes {
    
    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public async getUsers(req: Request, res: Response):Promise<void>{
        const users = await User.find();
        res.json(users);
    }

    public async getUser(req: Request, res: Response):Promise<void>{
        const user = await User.find({email: req.params.email}).populate('posts', 'title url');
        res.json(user);
    }

    public async createUser(req: Request, res: Response):Promise<void>{
        const { name, email, password, username } = req.body;
        const newUser = new User({name, email, password, username});
        await newUser.save();
        res.json({ data: newUser });

    }

    public async updateUser(req: Request, res: Response):Promise<void>{
        const { email } = req.params;
        const user = await User.findOneAndUpdate({ email }, req.body);
        res.json(user);
    }

    public async deleteUser(req: Request, res: Response):Promise<void>{
        const { email } = req.params;
        const user = await User.findOneAndDelete({ email });
        res.json({response: 'User Deleted successfully.'});
    }

    routes(){
        this.router.get('/', this.getUsers);
        this.router.get('/:email', this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:email', this.updateUser);
        this.router.delete('/:email', this.deleteUser);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;