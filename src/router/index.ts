import AutoHandler from "./handler/AutoHandler";

import setAWSLogLink from "./middleware/setAWSLogLink";

const handler = (dir, allowMethodsDiableCors = []) =>
  AutoHandler(dir, allowMethodsDiableCors, setAWSLogLink);

export { handler };
