import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

dotenv.config()

const PORT = process.env.PORT ?? 8080

const NODE_URL = process.env.NODE_URL ?? 'https://ghostnet.smartpy.io'
const BLOCK_EXPLORER_URL = process.env.BLOCK_EXPLORER_URL ?? 'https://ghostnet.tzkt.io'

const SIGNER_PRIVATE_KEY = process.env.SIGNER_PRIVATE_KEY
if (typeof SIGNER_PRIVATE_KEY === 'undefined') {
    throw new Error('Signer private key not configured.')
}
const SIGNER_PASSWORD = process.env.SIGNER_PASSWORD

const Tezos = new TezosToolkit(NODE_URL);
const signer = InMemorySigner.fromSecretKey(SIGNER_PRIVATE_KEY, SIGNER_PASSWORD);

Tezos.setProvider({ signer: new InMemorySigner(SIGNER_PRIVATE_KEY) });

const app = express()
app.use(express.json())
app.use(cors({
    origin: '*',
}))

app.post('/sapling_transaction', async (req, res) => {
    try {
        const transaction = req.body.transaction;
        const contractAddress = req.body.contractAddress;

        const contract = await Tezos.contract.at(contractAddress);
        const op = await contract.methods.default([transaction]).send();

        res.status(200).json({ hash: op.hash });

        console.log(`Waiting for ${op.hash} to be confirmed...`);
        await op.confirmation(3);
        console.log(`Operation injected: ${BLOCK_EXPLORER_URL.replace(/\/+$/, '')}/${op.hash}`);
    } catch (error) {
        console.error(error);
        res.status(500);
    }
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`)
})