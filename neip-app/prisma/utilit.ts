// delete later if not used

import { Prisma } from '@prisma/client';

// Extract all models and their fields from the Prisma schema
const obj: Record<string, Record<string, boolean>> = {};
const prismaModels = Prisma.dmmf.datamodel.models;

for (const model of prismaModels) {
  const modelName = model.name;
  if (modelName) {
    obj[modelName] = {};
    for (const field of model.fields) {
      const fieldName = field.name;
      obj[modelName][fieldName] = true;
    }
  }
}

// Export the dynamically generated object
export const PrismaOrmObject = obj;
