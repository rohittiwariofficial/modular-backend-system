import path from 'path';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const authSwagger = YAML.load(path.resolve(__dirname, '../docs/swagger/auth.yaml'));
const userSwagger = YAML.load(path.resolve(__dirname, '../docs/swagger/user.yaml'));
const adminSwagger = YAML.load(path.resolve(__dirname, '../docs/swagger/admin.yaml'));

const combined = {
  ...authSwagger,
  paths: {
    ...authSwagger.paths,
    ...userSwagger.paths,
    ...adminSwagger.paths
  },
  components: authSwagger.components,
  security: authSwagger.security
};

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(combined));
};