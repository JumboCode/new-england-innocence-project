// /pages/api/filter/filter.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Allow only POST requests.
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { operators, filters } = req.body;

  // Validate input format.
  if (!operators || !filters || !Array.isArray(filters) || !Array.isArray(operators)) {
    return res.status(400).json({ error: 'Invalid request body format' });
  }

  if (filters.length === 0) {
    return res.status(200).json({ exonereeIDs: [] });
  }

  if (filters.length > 1 && operators.length !== filters.length - 1) {
    return res.status(400).json({ error: 'Number of operators must be one less than number of filters' });
  }

  // This array will store an array of exoneree IDs for each filter.
  const finalList: number[][] = [];

  // Build base URL for sub-endpoint calls.
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = req.headers.host || 'localhost:3000';
  const baseUrl = `${protocol}://${host}`;

  // Process each filter in order.
  for (const filter of filters) {
    // Each filter must include type, field, and table.
    if (!filter.type || !filter.field || !filter.table) {
      return res.status(400).json({ error: 'Missing required filter parameters' });
    }

    // Determine which endpoint to call based on filter type.
    let endpoint = "";
    switch (filter.type) {
      case "date":
        endpoint = "/api/filter/filterByDate";
        break;
      case "string":
        endpoint = "/api/filter/filterByString";
        break;
      case "int":
        endpoint = "/api/filter/filterByInt";
        break;
      case "bool":
        endpoint = "/api/filter/filterByBool";
        break;
      case "tag":
        endpoint = "/api/filter/filterByTag";
        break;
      default:
        console.error(`Invalid filter type: ${filter.type}`);
        continue; // Skip any filter with an invalid type.
    }

    try {
      const fullUrl = `${baseUrl}${endpoint}`;
      console.log(`Calling ${fullUrl} with filter:`, filter);

      // Call the appropriate sub-endpoint.
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          value: filter.value,
          field: filter.field,
          table: filter.table,
          constraint: filter.constraint || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error(`Error response from ${endpoint}: ${errorData}`);
        throw new Error(`Error ${response.status}: ${errorData}`);
      }

      // Each sub-endpoint should return an array of exoneree IDs.
      const result = await response.json();
      let ids: number[] = [];
      if (Array.isArray(result)) {
        ids = result;
      } else if (result.exonereeIDs) {
        ids = result.exonereeIDs;
      } else if (result.ids) {
        ids = result.ids;
      }
      finalList.push(ids);
    } catch (error) {
      console.error("Error processing filter:", error);
      return res.status(500).json({ error: 'Failed to get IDs' });
    }
  }

  // If only one filter was provided, return its result directly.
  if (finalList.length === 1) {
    return res.status(200).json({ exonereeIDs: finalList[0] });
  }

  // Apply boolean operators:
  // First, process OR operators (union) since OR takes precedence.
  const ops = operators.map(op => op.toLowerCase());
  const combinedList = [...finalList];
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === "or") {
      combinedList[i] = Array.from(new Set([...combinedList[i], ...combinedList[i + 1]]));
      combinedList.splice(i + 1, 1);
      ops.splice(i, 1);
      i--;
    }
  }

  // Then process AND operators (intersection).
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === "and") {
      combinedList[i] = combinedList[i].filter(id => combinedList[i + 1].includes(id));
      combinedList.splice(i + 1, 1);
      ops.splice(i, 1);
      i--;
    }
  }

  return res.status(200).json({ exonereeIDs: combinedList[0] });
}
