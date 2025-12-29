import { useState, useEffect } from 'react';
import { SHEET_IDS } from '../config/sheets';
import { fetchSheetData } from '../utils/fetchData';

export type PortfolioData = {
    [key in keyof typeof SHEET_IDS]: Record<string, string>[];
};

export const usePortfolioData = () => {
    const [data, setData] = useState<Partial<PortfolioData>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadAll = async () => {
            try {
                const keys = Object.keys(SHEET_IDS) as (keyof typeof SHEET_IDS)[];
                // Fetch in parallel
                const promises = keys.map(async (key) => {
                    const rows = await fetchSheetData(SHEET_IDS[key]);
                    return { key, rows: rows as Record<string, string>[] };
                });

                const results = await Promise.all(promises);
                const newData: Partial<PortfolioData> = {};
                results.forEach(({ key, rows }) => {
                    newData[key] = rows;
                });

                setData(newData);
            } catch (err) {
                console.error(err);
                setError("Failed to load portfolio data");
            } finally {
                setLoading(false);
            }
        };
        loadAll();
    }, []);

    return { data, loading, error };
};
