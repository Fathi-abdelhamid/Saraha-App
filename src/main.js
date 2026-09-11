
import express from 'express'
import { authenticationController, messageController, userController } from './modules/index.js'
import { globalErrorHandling } from './middleware/index.js'
import { PORT } from './config.js'
import { bootstrapDB } from './DB/connection.db.js'
import { decryption, encryption } from './common/security/encryption.security.js'

const app = express()

const encValue = await encryption("Hello World")
const plain = await decryption(encValue)
console.log({encValue, plain });
bootstrapDB(app, PORT)

app.use(express.json())

app.all("/", (req, res) => res.status(200).send({ message: "Welcome to BE API 🌸" }))

app.use("/auth", authenticationController)
app.use("/message", messageController)
app.use("/user", userController)

app.all("{/*dummy}", (req, res) => res.status(404).send({ message: "Invalid application routing" }))

app.use(globalErrorHandling)


