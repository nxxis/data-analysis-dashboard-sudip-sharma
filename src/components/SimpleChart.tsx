import React, {useState, useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import {BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'; 
import { AllDatasales, validateArray } from '@/components/DataAnalyzer';
import ImageGeneratorAI from './ImageGeneratorAI';

//Inside of this .tsx --> I want to add the new AI button 

const SimpleChart = () => {
    const [chartType, setChartType] = useState('bar');
    const COLORS = ['#3b82f6', '#10b981', '#f59e42'];

    const [showHardcoded, setShowHardcoded] = useState(false);
    const [selectedDatasetName, setSelectedDatasetName] = useState(AllDatasales?.[0]?.name ?? '');
    const navigate = useNavigate();

    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    const [salesData, setSalesData] = useState([
        {month: 'Jan', sales: 65 },
        { month: 'Feb', sales: 85 },
        { month: 'Mar', sales: 75 },
        { month: 'Apr', sales: "apple" },
        { month: 'May', sales: 110 },
        { month: 'Jun', sales: 125 }
    ]);
    const barLineData = salesData;
    const pieData = useMemo(() => salesData.map(item => ({name: item.month, value: item.sales})), [salesData]);
    const scatterData = useMemo(() => salesData.map((item, i) => ({x: i + 1, y: item.sales})), [salesData]);
    // Validate hardcoded salesData too
    const hardcodedValidationMsg = validateArray(salesData.map(s => s.sales));
    
    const selectedEntry = useMemo(
        () => AllDatasales.find(e => e.name === selectedDatasetName) ?? AllDatasales[0],
        [selectedDatasetName]
    );
    const currentMonthly = useMemo(() => {
        const nums = selectedEntry?.data ?? [];
        return nums.map((v, i) => ({ month: months[i] ?? `M${i+1}`, sales: v }));
    }, [selectedEntry]);
    // Filter out non-numeric values so charts receive only valid numbers
    const numericMonthly = useMemo(() => {
        return currentMonthly.filter(m => typeof m.sales === 'number' && !Number.isNaN(m.sales));
    }, [currentMonthly]);
    const numericPie = useMemo(() => numericMonthly.map(m => ({ name: m.month, value: m.sales })), [numericMonthly]);
    const numericScatter = useMemo(() => numericMonthly.map((m, i) => ({ x: i + 1, y: m.sales })), [numericMonthly]);
    

    return (
        <div>
            <div className="mb-4 flex items-center gap-3">  
                <button
                    type="button"
                    onClick={() => setShowHardcoded(s => !s)}
                    className="px-3 py-1 rounded bg-indigo-600 text-white"
                    aria-expanded={showHardcoded}
                    aria-controls="hardcoded-charts"
                >
                    {showHardcoded ? 'Hide Hardcoded Data' : 'Hardcoded Data'}
                </button>
            </div>
            <div className="mb-4 flex gap-2">
                {AllDatasales.map(entry => (
                    <button
                    key={entry.name}
                    onClick={() => setSelectedDatasetName(entry.name)}
                    className={`px-3 py-1 rounded ${selectedDatasetName === entry.name ? 'bg-indigo-600 text-white' : 'bg-slate-200'}`}
                    aria-pressed={selectedDatasetName === entry.name}
                    >
                    {entry.name}
                    </button>
                ))}
            </div>
                    {showHardcoded && (
                        <section aria-label="Hardcoded charts">
                            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                                <button onClick={() => setChartType('bar')}>Bar</button>
                                <br />
                                <button onClick={() => setChartType('line')}>Line</button>
                                <br />
                                <button onClick={() => setChartType('pie')}>Pie</button>
                                <br />
                                <button onClick={() => setChartType('scatter')}>Scatter</button>
                            </div>

                            {/* If hardcoded data has validation error, show it instead of charts */}
                            {hardcodedValidationMsg ? (
                                <div className="p-4 border rounded bg-yellow-50 text-sm text-red-700">
                                    {hardcodedValidationMsg}
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height={300}>
                                    {chartType === 'bar' ? (
                                        <BarChart data={barLineData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="sales" fill="#3b82f6" />
                                        </BarChart>
                                    ) : chartType === 'line' ? (
                                        <LineChart data={barLineData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="sales" stroke="#10b981" />
                                        </LineChart>
                                    ) : chartType === 'pie' ? (
                                        <PieChart>
                                            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    ) : chartType === 'scatter' ? (
                                        <ScatterChart>
                                            <CartesianGrid />
                                            <XAxis dataKey="x" name="X" />
                                            <YAxis dataKey="y" name="Y" />
                                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                            <Scatter name="Sales" data={scatterData} fill="#f59e42" />
                                        </ScatterChart>
                                    ) : null}
                                </ResponsiveContainer>
                            )}
                        </section>
                    )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                        <button onClick={() => setChartType('bar')}>Bar</button>
                        <br></br>
                        <button onClick={() => setChartType('line')}>Line</button>    
                        <br></br>    
                        <button onClick={() => setChartType('pie')}>Pie</button>    
                        <br></br>    
                        <button onClick={() => setChartType('scatter')}>Scatter</button>            
                </div>  
                <div>
                    {/* If there's no numeric data for the selected dataset, show a helpful message */}
                    {numericMonthly.length === 0 ? (
                        // If the filtered numeric array is empty, show the same detailed message DataAnalyzer would show
                        (() => {
                            const raw = (selectedEntry?.data ?? []);
                            const msg = validateArray(raw);
                            return (
                                <div className="p-4 border rounded bg-yellow-50 text-sm text-red-700">{msg ?? `No numeric data available for "${selectedDatasetName}".`}</div>
                            );
                        })()
                    ) : (
                    <ResponsiveContainer width="100%" height={300}>
                            {chartType === 'bar' ? (
                                <BarChart data={numericMonthly}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="sales" fill="#3b82f6" />
                                </BarChart>
                            ) : chartType === 'line' ? (
                                <LineChart data={numericMonthly}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="sales" stroke="#10b981" />
                                </LineChart>
                            ) : chartType === 'pie' ? (
                                <PieChart>
                                    <Pie data={numericPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                                        {numericPie.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            ) : chartType === 'scatter' ? (
                                <ScatterChart>
                                    <CartesianGrid />
                                    <XAxis dataKey="x" name="X" />
                                    <YAxis dataKey="y" name="Y" />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Scatter name="Sales" data={numericScatter} fill="#f59e42" />
                                </ScatterChart>
                            ) : null}
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
             <div>
                <div className="mb-2 text-sm font-medium">AI Image Generator</div>
                <ImageGeneratorAI />
            </div>
            <div className="mt-6 flex justify-center">
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="px-4 py-2 rounded bg-slate-700 text-white"
                    aria-label="Go home"
                    title="Home"
                >
                    Home
                </button>
            </div>
        </div>
    );
};

export default SimpleChart;