import { NextApiRequest, NextApiResponse } from 'next';

//parse the JSON body
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Destructure the request body
    const { operators, filters } = req.body;

    const finalList: number[][] = []; // List of lists to store IDs

    //make each filter call
    for (const filter of filters) {
        let endpoint = "";

        // Determine which API endpoint to call
        if (filter.type === "date") {
            endpoint = "/api/filter/filterByDate";
        } else if (filter.type === "string") {
            endpoint = "/api/filter/filterByString";
        } else if (filter.type === "int") {
            endpoint = "/api/filter/filterByInt";
        } else {
            console.error(`Invalid filter type: ${filter.type}`);
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
            console.log(`response ${response}`)
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const exonereeIds: number[] = await response.json();
            console.log(`Exoneree IDs ${exonereeIds}`)
            finalList.push(exonereeIds); // Store each list of IDs in final list
        } catch (error) {
            return res.status(404).json({ error: `Failed to get IDs ${error}` });
        }
    }

    // finalList = [[1, 2, 3], [4, 5, 6], [7, 2, 6, 4,], [23, 65, 96, 2, 3, 4, 5]]

    // console.log(`Original List of IDs: ${finalList}`);



    // Step 2: Apply "or" operations first
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "or") {
            finalList[i] = Array.from(new Set([...finalList[i], ...finalList[i + 1]])); // replace two lists with merged list
            finalList.splice(i + 1, 1); // Remove the second list
            operators.splice(i, 1); // Remove used operator
            i--; // Adjust index after removal
        }
    }

    console.log(`List of IDs after 'or': ${finalList}`);

    // Step 3: Apply "and" operations
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "and") {
            finalList[i] = finalList[i].filter(id => finalList[i + 1].includes(id)); // replace two lists with merged list
            finalList.splice(i + 1, 1); // Remove the second list
            operators.splice(i, 1); // Remove used operator
            i--; // Adjust index after removal
        }
    }

    // The final list should contain only one array, return it
    // console.log("Final List of Lists of Exoneree IDs:", finalList);

    // console.log("Final Exoneree IDs:", finalList[0] || []);

    return res.status(201).json({ exonereeIDs: finalList });





};

/** Test Data:
 * http://localhost:3000/api/filter/filter
 * {
                "operators": ["and", "or"],

                "filters": 
                [{
                    "type": "date",
                    "value": "2000-01-01",
                    "field": "convictionDate",
                    "constraint": "before",
                    "table": "caseInfo"
                },
                {
                    "type": "string",
                    "value": "African-American",
                    "field": "ethnicity",
                    "table": "personalInfo"
                },
                {
                    "type": "int",
                    "value": 10,
                    "field": "yearsInPrison",
                    "constraint": "<=",
                    "table": "caseInfo"
                }]
            }
 */

/**
             * {
                "operators": ["or"],

                "filters": 
                [{
                    "type": "date",
                    "value": "2000-01-01",
                    "field": "convictionDate",
                    "constraint": "before",
                    "table": "caseInfo"
                },
                {
                    "type": "date",
                    "value": "2000-01-01",
                    "field": "dateOfBirth",
                    "constraint": "before",
                    "table": "personalInfo"
                }
                ]
            }
             */
