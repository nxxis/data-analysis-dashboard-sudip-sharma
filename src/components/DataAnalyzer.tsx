import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export const AllDatasales = [
        {name: '2023 Sales', year: 2023, data: [65,85,75,95,110,125,80,140,120,150,145,200]},
        {name: '2024 Sales', year: 2024, data: [70,100,80,100,75,85,135,145,95,155,175,210]},
        {name: '2025 Sales', year: 2025, data: [80,90,85,110,"apple",105,125,150,130,160,180,220]},
    ];
    // Exportable validation helper for other components to reuse
    // Returns a string error message when invalid, or null when valid.
    export const validateArray = (arr: any[]): string | null => {
        if (!arr || arr.length === 0) return 'No data selected to validate';
        const invalid = arr.map((v, i) => ({ v, i })).filter(item => typeof item.v !== 'number' || Number.isNaN(item.v));
        if (invalid.length > 0) {
            const indices = invalid.map(x => x.i).join(', ');
            const examples = invalid.slice(0, 3).map(x => `${x.i}: ${JSON.stringify(x.v)}`).join('; ');
            return `Non-numeric values at index(es) ${indices}. Examples: ${examples}`;
        }
        return null;
    };
const DataAnalyzer = () => {
    //const sampleData = [23, 45, 67, 89, 34, 56, 78, 90, 75, 45, 67, 89];
    const [analysis, setAnalysis] = useState(null);
    const [currentDataset, setCurrentDataset] = useState('2023 Sales'); // Default dataset
    const [error, setError] = useState("");

    const [selectedYear, setSelectedYear] = useState(2023); // Default year

    const getCurrentArray = () => {
        const exact = AllDatasales.find(item => item.name === currentDataset && item.year === selectedYear);
        if (exact) return exact.data;

        const byName = AllDatasales.find(item => item.name === currentDataset);
        if (byName) return byName.data;

        const parsedYear = parseInt(currentDataset);
        if (!Number.isNaN(parsedYear)){
            const byParsedYear = AllDatasales.find(item => item.year === parsedYear);
            if (byParsedYear) return byParsedYear.data;
        }
        
        return [];
    };

    
    
    {/*
        const [salesData, setSalesData] = useState([
                { month: 'Jan', sales: 65 },
                { month: 'Feb', sales: 85 },
                { month: 'Mar', sales: 75 },
                { month: 'Apr', sales: 95 },
                { month: 'May', sales: 110 },
                { month: 'Jun', sales: 125 },
                { month: 'Jul', sales: 130 },
                { month: 'Aug', sales: 140 },
                { month: 'Sep', sales: 120 },
                { month: 'Oct', sales: 150 },
                { month: 'Nov', sales: 170 },
                { month: 'Dec', sales: 200 },
            ]);

        */}

    const analyzeData = () => {
    // Calculate statistics
    const data = getCurrentArray();
    //Want to add the datasets, with the option/select being displayed for users
    const validNumbers = data.filter((num): num is number => typeof num === 'number' && !isNaN(num));
    if (validNumbers.length === 0) {
        setAnalysis({error: "No valid numbers to analyze"});
        return;
    }
    const sum = validNumbers.reduce((total, num) => total + num, 0);
    const count = validNumbers.length;
    const average = sum / count;
    const maximum = Math.max(...validNumbers);
    const minimum = Math.min(...validNumbers);
    const currentArray = AllDatasales.find(item => item.name === currentDataset && item.year === selectedYear)?.data;
    
    setAnalysis({
        sum,
        average: average.toFixed(2),
        maximum,
        minimum,
        count
    });

    };

    // Reset the analysis result
    const handlereset = () => {
        setAnalysis(null);
        setError("");
    };

    const handleInputErrors = () => {
        //Handling errors within the array
        {/* Filter out non-numeric values
            Show an error if no valid numbers are found
            Handle empty arrays gracefully */}
        const currentArray = getCurrentArray();

        if (!currentArray || currentArray.length === 0) {
            setError("No data selected to validate");
            return false;
        }

        const invalid = currentArray
            .map((v, i) => ({ v, i }))
            .filter(item => typeof item.v !== 'number' || Number.isNaN(item.v));

        if (invalid.length > 0) {
            const indices = invalid.map(x => x.i).join(', ');
            const examples = invalid.slice(0, 3).map(x => `${x.i}: ${JSON.stringify(x.v)}`).join('; ');
            setError(`Non-numeric values at index(es) ${indices}. Examples: ${examples}`);
            return false;
        }
        // No errors
        setError("");
        return true
    };

    // (validation helper is exported at module scope)

    return (
        <div> 
            <h1>Data Analyzer</h1>
            <div className = "mb-2">
                <label htmlFor="dataset-select" className="sr-only">Select Dataset:</label>
                <select 
                id="dataset-select"
                value={currentDataset}
                onChange={e => setCurrentDataset(e.target.value)}
                className="px-2 py-1 border rounded"
                >
                    {AllDatasales.map(item => (
                        <option key={item.name} value={item.name}>
                        {item.name}
                        </option>
                    ))}
                </select>
            </div>

            {/*}
            <select value={selectedYear} onChange={e => setSelectedYear(Number(e.target.value))}>
                {[...new Set(AllDatasales.map(item => item.year))].map( y => <option key={y} value={y}>{y}</option>)}
            </select>
            */}
            <div> 
                <Button onClick={() => { handleInputErrors(); analyzeData(); }}>Analyze Data</Button>
                {error && (<p className="text-center text-red-600 text-sm">{error}</p>)}
                {analysis && (
                    analysis.error ? (
                        <div style = {{color: 'red'}}>Error: {analysis.error}</div>
                    ) : (
                        <dl className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <dt className="font-medium text-muted-foreground">Sum</dt>
                            <dd>{analysis.sum}</dd>
                        </div>
                        <div>
                            <dt className="font-medium text-muted-foreground">Average</dt>
                            <dd>{analysis.average}</dd>
                        </div>
                        <div>
                            <dt className="font-medium text-muted-foreground">Maximum</dt>
                            <dd>{analysis.maximum}</dd>
                        </div>
                        <div>
                            <dt className="font-medium text-muted-foreground">Minimum</dt>
                            <dd>{analysis.minimum}</dd>
                        </div>
                        <div className="col-span-2">
                            <dt className="font-medium text-muted-foreground">Count</dt>
                            <dd>{analysis.count}</dd>
                        </div>
                        </dl>
                    )
                )}
                <Button onClick = {handlereset}>Reset</Button>
            </div> 
            
        </div> 
        


    ); 
};

export default DataAnalyzer;
