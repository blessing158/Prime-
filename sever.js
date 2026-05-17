import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {

    try{

        const userMessage = req.body.message;

        const completion =
        await openai.chat.completions.create({

            model:"gpt-4.1-mini",

            messages:[
                {
                    role:"system",
                    content:
                    "You are Prime AI, a futuristic assistant inspired by Iron Man technology."
                },
                {
                    role:"user",
                    content:userMessage
                }
            ]
        });

        res.json({
            reply:
            completion.choices[0].message.content
        });

    }catch(error){

        console.log(error);

        res.status(500).json({
            reply:"Server error."
        });
    }
});

app.listen(3000, () => {
    console.log("Prime AI running on port 3000");
});
