import { NextApiRequest, NextApiResponse } from 'next';
import { json2csv } from 'json-2-csv';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { selectedColumns, data } = req.body;

      // Ensure the headers are in the correct order based on selectedColumns
      const headers = selectedColumns;

      // Create CSV rows from data (map over data to match selected columns)
      const csvData = data.map((row: { [key: string]: any }) => {
        // Map each row based on the order of columns in selectedColumns
        return selectedColumns.map((col: string) => row[col] || ''); // Ensure we get the value for each column
      });

      // Add the header row to the csvData
      const fullCsvData = [headers, ...csvData];

      // Convert to CSV
      const csv = await json2csv(fullCsvData);

      // Set CSV response headers
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=exonerees.csv');

      // Send the CSV
      res.status(200).send(csv);
    } catch (error) {
      console.error('Error generating CSV:', error);
      res.status(500).json({ message: 'Error generating CSV' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
