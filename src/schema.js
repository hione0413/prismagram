// api 폴더 안에 만들어질 graphql 파일들과 resolvers 파일(js)들을 통합해준다.
import path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";

const allTypes = fileLoader(path.join(__dirname, "api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "api/**/*.js"));   // 주의: api 폴더에 resolver 인 js만 위치해야한다.

const schema = makeExecutableSchema({
    typeDefs: mergeTypes(allTypes),
    resolvers: mergeResolvers(allResolvers)
});

export default schema;