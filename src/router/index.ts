import AutoHandler from './handler/AutoHandler';

import setAWSLogLink from './middleware/setAWSLogLink';

const handler = (dir: string) => AutoHandler(dir, setAWSLogLink);

export { handler };
