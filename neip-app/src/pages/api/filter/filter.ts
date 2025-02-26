import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Destructure the request body
    const { operators, filters } = req.body;

    if (!operators || !filters || !Array.isArray(filters) || !Array.isArray(operators)) {
        return res.status(400).json({ error: 'Invalid request body format' });
    }

    if (filters.length === 0) {
        return res.status(200).json({ exonereeIDs: [[]] });
    }

    if (operators.length !== filters.length - 1 && filters.length > 1) {
        return res.status(400).json({ error: 'Number of operators must be one less than number of filters' });
    }

    const finalList: number[][] = []; // List of lists to store IDs
    
    // Get the host from the request headers to construct absolute URLs
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = req.headers.host || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;

    //make each filter call
    for (const filter of filters) {
        if (!filter.type || !filter.field || !filter.table) {
            return res.status(400).json({ error: 'Missing required filter parameters' });
        }

        let endpoint = "";

        // Determine which API endpoint to call
        if (filter.type === "date") {
            endpoint = "/api/filter/filterByDate";
        } else if (filter.type === "string") {
            endpoint = "/api/filter/filterByString";
        } else if (filter.type === "int") {
            endpoint = "/api/filter/filterByInt";
        } else if (filter.type === "bool") {
            endpoint = "/api/filter/filterByBool";
        } else if (filter.type === "tag") {
            endpoint = "/api/filter/filterByTag";
        } else {
            console.error(`Invalid filter type: ${filter.type}`);
            continue; // Skip this filter
        }

        try {
            // Construct the full URL for the API endpoint
            const fullUrl = `${baseUrl}${endpoint}`;
            console.log(`Calling endpoint ${fullUrl} with filter:`, filter);
            
            const response = await fetch(fullUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    value: filter.value,
                    field: filter.field,
                    table: filter.table,
                    constraint: filter.constraint || null,
                }),
            });
            
            console.log(`Response status: ${response.status}`);
            
            if (!response.ok) {
                const errorData = await response.text();
                console.error(`Error response: ${errorData}`);
                throw new Error(`Error ${response.status}: ${errorData}`);
            }

            const exonereeIds = await response.json();
            console.log(`Exoneree IDs:`, exonereeIds);
            finalList.push(exonereeIds); // Store each list of IDs in final list
        } catch (error) {
            console.error('Filter error:', error);
            return res.status(500).json({ error: `Failed to get IDs: ${error.message}` });
        }
    }

    // If no filters were processed successfully, return empty array
    if (finalList.length === 0) {
        return res.status(200).json({ exonereeIDs: [[]] });
    }

    // If only one filter, return results directly
    if (finalList.length === 1) {
        return res.status(200).json({ exonereeIDs: finalList });
    }

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

    return res.status(200).json({ exonereeIDs: finalList });
}