import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { value, field, constraint, table } = req.body;

    if (!value || !field || (constraint !== "is" && constraint !== "is not") || !table) {
        return res.status(400).json({ error: 'Invalid or missing parameters' });
    }

    try {
        let exonereeIds = [];
        
        // Handle each table separately based on schema
        if (field === 'officersInvolved') {
            // Check if the filter relates to officersInvolved or other officer-related fields
            if (constraint === "is") {
                const exonerees = await prisma.exoneree.findMany({
                    where: {
                        legalInfo: {
                            officersInvolved: {
                                has: value // assuming 'value' here is an officer ID or identifier
                            }
                        }
                    },
                    select: { id: true }
                });
                exonereeIds = exonerees.map(e => e.id);
            } else {
                const exonerees = await prisma.exoneree.findMany({
                    where: {
                        legalInfo: {
                            NOT: {
                                officersInvolved: {
                                    has: value // 'value' should represent officer ID or name
                                }
                            }
                        }
                    },
                    select: { id: true }
                });
                exonereeIds = exonerees.map(e => e.id);
            }
        } else if (table === "legalInfo") {
            // Legal info has array fields: convictionMethod, officersInvolved, originalCharges
            if (constraint === "is") {
                const exonerees = await prisma.exoneree.findMany({
                    where: {
                        legalInfo: {
                            [field]: {
                                has: value
                            }
                        }
                    },
                    select: { id: true }
                });
                exonereeIds = exonerees.map(e => e.id);
            } else {
                const exonerees = await prisma.exoneree.findMany({
                    where: {
                        legalInfo: {
                            NOT: {
                                [field]: {
                                    has: value
                                }
                            }
                        }
                    },
                    select: { id: true }
                });
                exonereeIds = exonerees.map(e => e.id);
            }
        } else if (table === "postExonerationInfo") {
            // PostExonerationInfo has reentrySupport array
            if (constraint === "is") {
                const exonerees = await prisma.exoneree.findMany({
                    where: {
                        postExonerationInfo: {
                            [field]: {
                                has: value
                            }
                        }
                    },
                    select: { id: true }
                });
                exonereeIds = exonerees.map(e => e.id);
            } else {
                const exonerees = await prisma.exoneree.findMany({
                    where: {
                        postExonerationInfo: {
                            NOT: {
                                [field]: {
                                    has: value
                                }
                            }
                        }
                    },
                    select: { id: true }
                });
                exonereeIds = exonerees.map(e => e.id);
            }
        } else {
            return res.status(400).json({ error: `Table '${table}' not supported for tag filtering` });
        }
        
        return res.status(200).json(exonereeIds);
    } catch (error) {
        console.error('Filter by tag error:', error);
        return res.status(400).json({ error: `Failed to fetch exonerees: ${error}` });
    }
}