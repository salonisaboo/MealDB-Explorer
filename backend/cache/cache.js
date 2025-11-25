import NodeCache from "node-cache";
const cache = new NodeCache({stdTTL:600,maxKeys:1000});
export default cache;