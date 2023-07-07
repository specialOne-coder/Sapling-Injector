# Sapling Injector

A basic HTTP service to submit Tezos Sapling transactions.

## Quick Start

The injector is built with [Express](https://expressjs.com/) and requires the [Node.js](https://nodejs.org/en/) (>= 0.10) environment to run.

### Configuration

Before running the service, install its dependencies first:

`$ npm install`

Next, set up the environment (the injector uses the [dotenv](https://www.npmjs.com/package/dotenv) module to load environment variables). Create an `.env` file in the root directory of the project and set the variables:

```bash
# .env

# OPTIONAL
# Defaults to 8080
PORT=8080

# OPTIONAL
# Defaults to https://ghostnet.smartpy.io
NODE_URL="https://ghostnet.smartpy.io"

# OPTIONAL
# Defaults to https://ghostnet.tzkt.io
BLOCK_EXPLORER_URL="https://ghostnet.tzkt.io"

# **REQUIRED**
# The encoded private key of the account that will be
# responsible for submitting the Sapling transactions
SIGNER_PRIVATE_KEY="ed(e)sk/sp(e)sk/p2(e)sk..."

# **REQUIRED** if `SIGNER_PRIVATE_KEY` is encrypted, otherwise redundant
# Used to decrypt the private key
SIGNER_PASSWORD="..."
```

*Note: Optional variables can be omitted and removed from the configuration file, if the default values are acceptable. The **REQUIRED** variables, however, must always be set with valid values, otherwise the injector won't work as intended.*

### Run

Once the project is configured, start the server with:

`$ npm start`

## Endpoints

### `POST /sapling_transaction`

#### Request

```json
{
    "transaction": "^[a-fA-F0-9]+$",
    "contractAddress": "KT1..."
}
```

- `transaction` - a Sapling transaction in the form of a hexadecimal string without the `0x` prefix (as required by the contract).
- `contractAddress` - a valid Sapling contract address.
    
    The contract is expected to have a default entrypoint which takes a list of [`sapling_transaction ms`](https://tezos.gitlab.io/michelson-reference/#type-sapling_transaction) as its only argument (the service was tested with a sample [shielded tez](https://tezos.gitlab.io/active/sapling.html#shielded-tez) contract).

Example

```json
{
    "transaction": "000001605ad0c5525ee0d7e5f4a06071043db7f85611d7775364a34eb22106d1799a4c2ab25afc7565070113f9c8dcd320359f89b64ef6cc831361b67fe97475ad38462a192a54c96caf481fc0abcd59daf736063e8fc5c7ea1d6374c4432218747db98493aedc8bc9177742be5d42a5c649633f1089188d9b804dea3ce3987e2e70cf26da5a5a801d53db71fe3fb183d9c67a52aff3d2c2d18c1f11ca9ebbb4b57b56b129ad3242de99979c5e0bc3143914bb99364daf6a42de85c85c6144b6aeabfbe718181610243b1ffdb2ae69e6e25be8ffa5a97bebc39fbcb3e408f20b4acb30cc09952677a1d3271afd5f802c6431ae5b96b92bf74a434e06605c58c0d51fc56ddbdfc8bdc2d632f773081bb78240b59e78e2c134c7a6ebe9eb2b6437aa988acaf1f3a3203a4c9946650e007358bc7f2e168bf2713e544bca413b22efaa9c4fabbc27dd9f048db4c7497c45bdfcca90c452569e310c2a63488edc58158209fa09000003e662ab47c2e894367e75295a052f84e4a4310ce013484393582c666b63a193555484c67d21410cd8b0d22d720e4a012e650a31324f7254cbfd40ca207900bdabd00228b82b99b98c4cdbb4321e1a34fc28af5133c642c56663ef260b0538602e8275e0e0625b31e8b8784112c47ce1dcef5bee1c8c958fece389c2195736480a200e0cff7a408c51c189f64d0bdf2ae112d49ace0fa4ade592d11f517bbe41a5a4f7b9cc83a716b4157e2e2eddda6eedbc8d7c256bb486a7520f7b4b9aa789f327c6642a5a8cec76122d1eb093900a87f48be84115fc1d478ba604128d7ed7e4f765dfa0b7f221eacf2bb01ba3591ee5189de97984d3069c9bf120d2f650430adf34af5aa626c0216286266a117cf05ec0cb9f76e6464fe8a2d7def42fce2a3d4b0000004ffba38601a9161060d76259bfc21fb74ff5660c191fdb9a8cf2c6db75a081c021a5f0df0077d63729f60e36b065a096a04857f35175cf4cc4b59242d2576d35780a4a5c5a066ba1e5ebe2c0960a46a43fe9c82d6076c27fbfeac1ebc9e906289c4993ebc3f07d9af0411d9dd7b955a171ad18bb3547947db3b7361995ca3c2a38057cdc43e0338ed29ea036b97924f5a9b1719ec5cf4d135f1590ec7ee7e7955f7f1f536f66881ec7417ebad348a9ff680524da9a045dc862270fed80992ae8f588293389949294ebd57a88a3d138f41d5606480b75d11b0c8ac732cbf68e6b6379fab03155c0143654e0d403a5a222b0cbcf8d106290f6f0ef891d8fc969476d90834c6d205b0b825a0fed5b04ae3d9d53178183284943ca37d7bedbc1ab9794f8eb34015a61dd3320b6237ef5948b8e7b85ad451dfbe508b60de6269e1dd37a15ecb8fcdd006e717caf444e965b73146404e31863e8ca33e5079d908b66f6991a784301b023387f6852467ab5aee1f338e98b4fc3345a46ab312fffe006b3a42f399ecf3bc18d244553dfc774a2741d96f1867e2210eb1759877b6e1cd021887dc285d8ba885cbb8b6d1072aff4b949af982543a4a00ca29ff3b81dd70fba594f1f192252da003963841a380ba7b091d3ab25bc2a9041cad58d51c98e50571206de51a863238eaea1c618f4a809460000004fafe725888ce2fd3f03628792c7bdd7036681aee47c53467e3cd5ad55ae8d5e1b77f7b5f8274e7d91e63281ee0f4eee0fa98ed76c6a19f51870d5183c5d17d5d139e65d0fac9b4ebdc71c43d471477e99eacdc727ddbbbfc498ac2573d44851444a58c3c8b9f9375e24861db1fc995c29e01a41c471c93f4ef06bb3fc27b953f1cbdc9f8628c5e3a2ea789bd4a14224a003bcb5e2ebc495364cd3dac848aaa01377867d1a0c7758b79597aa6e6c72e684e3d1e684a5a5fd9c9e81a2c3c24ab228501a6ae8c7ae0277a884915bde42baeedb9b69d9e8daccee6e523634c8a1a52c53bcee1f01cdb23f030901948b8de43d53c01663a6566044a14b418cfa1bbfacba3104336dc2aba9ea8803264fa707000000000000000041b7b909a3766379f474e8aa1bacfcb155b639f5c6373c99c53624715c63381000000000",
    "contractAddress": "KT1Wr1z3CwrZamPsazpVXefpEjXUBScUPuHZ"
}
```

#### Response

**Code**: `200 OK`

```json
{
    "hash": "op..."
}
```

- `hash` - the hash of the succesfully submitted operation.

Example

```json
{
    "hash": "opV67CL5m32WAm76qyhN4ZmnyWToS2et4EZCqv4YYHYrFdgkcYS"
}
```
