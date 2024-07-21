// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt,{Secret} from "jsonwebtoken";
import { authenticateToken } from '../middleware/AuthenticateToken';

// Global Config
export const usersRouter = express.Router();
usersRouter.use(express.json());

// GET
usersRouter.get("/", async (_req: Request, res: Response) => {
    try {
        if (!collections.users) {
            throw new Error("Users collection is not initialized");
        }

        const userDocuments = await collections.users.find({}).toArray();

        // Map MongoDB documents to User instances
        const users: User[] = userDocuments.map(doc => {
            // Assuming 'name', 'email', and 'password' are properties of the MongoDB document
            const { _id, name, email, password } = doc;
            return new User(name, email, password, _id); // Create a new User instance
        });

        res.status(200).send(users);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

//GET by ID
usersRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        if (!id) {
            throw new Error("ID parameter is missing");
        }

        if (!collections.users) {
            throw new Error("Users collection is not initialized");
        }

        const query = { _id: new ObjectId(id) };
        const user = await collections.users.findOne(query);

        if (user) {
            // Assuming 'name', 'email', and 'password' are properties of the MongoDB document
            const { _id, name, email, password } = user;
            const userInstance = new User(name, email, password, _id);
            res.status(200).send(userInstance);
        } else {
            res.status(404).send(`Unable to find matching document with id: ${id}`);
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

// POST
usersRouter.post("/", async (req: Request, res: Response) => {
    try {
        if (!collections.users) {
            throw new Error("Users collection is not initialized");
        }
        const existingUser = await collections.users.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).send("Email already exists");
        }
        const salt = await bcrypt.genSalt();
        const newUser = req.body as User;
        const hashedPassword = await bcrypt.hash(newUser.password, salt);
        const hashedNewUser = new User(newUser.name, newUser.email, hashedPassword);
        const result = await collections.users.insertOne(hashedNewUser);
        result
            ? res.status(200).send(`Successfully created a new user with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new user.");
    } catch (error: any) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT
usersRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedUser: User = req.body as User;
        const query = { _id: new ObjectId(id) };

        const result = await collections.users?.updateOne(query, { $set: updatedUser });

        result
            ? res.status(200).send(`Successfully updated user with id ${id}`)
            : res.status(304).send(`User with id: ${id} not updated`);
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE
usersRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.users?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed game with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove game with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Game with id ${id} does not exist`);
        }
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }

});

//LOGIN
usersRouter.post("/login", async (req: Request, res: Response) => {
    try {
        const loggedUser = req.body as User;
        const email = loggedUser.email;
        console.log("email : " + email);
        const password = loggedUser.password;

        // Check if email and password are provided
        if (!loggedUser.email || !loggedUser.password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find the user by email
        const user = await collections.users?.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        else {
            const accessToken = jwt.sign({ userId: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET as Secret);
            res.status(200).json({ accessToken: accessToken });
        }
        

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//AUTHENTICATE TOKEN
usersRouter.post('/authenticate-token', authenticateToken, (req: Request, res: Response) => {
    try {
      const user = req.user;
      res.status(200).json({
        message: 'Token is valid',
        user
      });
    } catch (error) {
      console.error('Error in /authenticate-token route:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });