import { PrismaClient } from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv'
import ws from 'ws'


//connect to the database
dotenv.config()
neonConfig.webSocketConstructor = ws
const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)
const prisma = new PrismaClient({ adapter })

//parse the JSON body
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Destructure the request body
    const { operators, filters } = req.body;

    const handleApplyFilters = async () => {
        const filters = [
            {
                type: "date",
                value: "2000-01-01",
                field: "releaseDate",
                constraint: "before",
                table: "caseInfo",
            },
            {
                type: "string",
                value: "New York",
                field: "location",
                table: "personalInfo",
            },
            {
                type: "int",
                value: 10,
                field: "yearsServed",
                constraint: "greater",
                table: "postExonerationInfo",
            },
        ];

        let finalList: number[][] = []; // List of lists to store IDs

        for (const filter of filters) {
            let endpoint = "";

            // Determine which API endpoint to call
            if (filter.type === "date") {
                endpoint = "/api/filterByDate";
            } else if (filter.type === "string") {
                endpoint = "/api/filterByString";
            } else if (filter.type === "int") {
                endpoint = "/api/filterByInt";
            } else {
                console.error(`Invalid filter type: ${filter.type}`);
                finalList.push([]); // Push empty list for invalid type
                continue; // Skip this filter
            }

            try {
                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        value: filter.value,
                        field: filter.field,
                        table: filter.table,
                        constraint: filter.constraint || null, // Only needed for date and int
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const exonereeIds: number[] = await response.json();
                finalList.push(exonereeIds); // Store each list of IDs in final list
            } catch (error) {
                console.error(`Error fetching from ${endpoint}:`, error);
                finalList.push([]); // Push an empty list if the API call fails
            }
        }


        // Step 2: Apply "or" operations first
        for (let i = 0; i < operators.length; i++) {
            if (operators[i] === "or") {
                finalList[i] = Array.from(new Set([...finalList[i], ...finalList[i + 1]])); // Union
                finalList.splice(i + 1, 1); // Remove the merged list
                operators.splice(i, 1); // Remove used operator
                i--; // Adjust index after removal
            }
        }

        // Step 3: Apply "and" operations
        for (let i = 0; i < operators.length; i++) {
            if (operators[i] === "and") {
                finalList[i] = finalList[i].filter(id => finalList[i + 1].includes(id)); // Intersection
                finalList.splice(i + 1, 1); // Remove the merged list
                operators.splice(i, 1); // Remove used operator
                i--; // Adjust index after removal
            }
        }

        // The final list should contain only one array, return it
        console.log("Final Exoneree IDs:", finalList[0] || []);


        console.log("Final List of Lists of Exoneree IDs:", finalList);


    };





}




