import Papa from 'papaparse';

export const fetchSheetData = async (sheetId: string) => {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&t=${new Date().getTime()}`;
    return new Promise<any[]>((resolve) => {
        Papa.parse(url, {
            download: true,
            header: true,
            skipEmptyLines: true,
            transformHeader: (header) => header.trim(),
            complete: (results) => {
                // Trim all values in each row
                const cleanedData = results.data.map((row: any) => {
                    const newRow: any = {};
                    Object.keys(row).forEach(key => {
                        newRow[key] = typeof row[key] === 'string' ? row[key].trim() : row[key];
                    });
                    return newRow;
                });
                resolve(cleanedData);
            },
            error: (err) => {
                console.error("Error fetching CSV for sheet " + sheetId, err);
                resolve([]);
            }
        });
    });
};
