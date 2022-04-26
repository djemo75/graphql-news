"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const express_1 = __importDefault(require("express"));
const express_jwt_1 = __importDefault(require("express-jwt"));
require("reflect-metadata");
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const schema_1 = require("./schema");
const config_1 = require("./configs/config");
const tokenUtils_1 = require("./utils/tokenUtils");
const { GRAPHQL_PATH, PORT, MONGODB_URL, JWT_SECRET } = (0, config_1.getConfig)();
const auth = (0, express_jwt_1.default)({
    secret: JWT_SECRET,
    algorithms: ['HS256'],
    credentialsRequired: false,
});
mongoose_1.default
    .connect(MONGODB_URL, { autoIndex: true })
    .then(() => console.log('connected to mongodb'))
    .catch(console.log);
const startApolloServer = async () => {
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    app.use(GRAPHQL_PATH, (0, cors_1.default)({ origin: '*' }), body_parser_1.default.json(), auth);
    const schema = await (0, schema_1.getSchema)();
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)(),
        ],
        introspection: true,
        context: ({ req }) => {
            const accessToken = (0, tokenUtils_1.extractTokenFromHeader)(req.headers.authorization);
            let tokenData = null;
            try {
                tokenData = (0, tokenUtils_1.decodeAccessToken)(accessToken);
            }
            catch (error) {
                tokenData = null;
            }
            const context = {
                req,
                accessToken,
                tokenData,
            };
            return context;
        },
    });
    await server.start();
    server.applyMiddleware({ app, path: GRAPHQL_PATH });
    httpServer.listen({ port: PORT });
    console.log(`Server started at http://localhost:${PORT}/${GRAPHQL_PATH}`);
    return { server, app };
};
startApolloServer();
