// TODO
import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { value, field, constraint } = req.body;

    if (!value || !field || (constraint != "is" && constraint != "is not")) {
        return res.status(400).json({ error: 'Invalid or missing parameters' });
    }

    let model_name: string | undefined;

    // find the model where the field is contained
    const models = Prisma.dmmf.datamodel.models;
    outerLoop: for (const model of models) {
        for (const mod_column of model.fields) {
            if (field === mod_column.name) {
                model_name = model.name;
                break outerLoop;
            }
        }
    }

    if (!model_name) {
        return res.status(404).json({ error: `Field '${field}' not found in any model.` });
    }

    // Make the first letter of model name lowercase
    model_name = model_name.charAt(0).toLowerCase() + model_name.slice(1);


    try {
        let exonerees;

        // Query the database for Exoneree IDs
        if (constraint === "is") {
            exonerees = await prisma.exoneree.findMany({
                where:  { 
                    [model_name]: { 
                        [field]: value 
                    } 
                },
                select: { id: true },
            });

        } else if (constraint === "is not") {
            exonerees = await prisma.exoneree.findMany({
                where:  { 
                    NOT: {
                        [model_name]: { 
                            [field]: value 
                        } 
                    }
                },
                select: { id: true },
            });
        }

        // Extract IDs from the results
        const exonereeIds = exonerees?.map((exoneree) => exoneree.id) || [];

        return res.status(200).json({ ids: exonereeIds });

    } catch (error) {
        console.error('Filter error:', error);
        return res.status(400).json({ error: 'Failed to fetch exonerees' });
    }

   
}
