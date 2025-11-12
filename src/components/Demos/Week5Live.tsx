import React from 'react';
import DataAnalyzer from '../DataAnalyzer';
import SimpleChart from '../SimpleChart';


{/*
    Bar Charts: good for comparing two data sets
    Line Chart: good for seeing the progression over time
    Pie Chart: good for seeing the percentages being broken down
    Scatter Chart: shows the relationship between two variables

*******make sure to label the chart properly 
so it easier to map for future charts******************

<ResponsiveContainer width="100%" height={300}>
    Chart information would go in here
</ResponsiveContainer>
     */}

const Week5Live = () => {
    return (
        <div>
            <h1>Week 5 Live Demo</h1>
            <p>This is the content for Week 5 Live Demo.</p>
            <DataAnalyzer />
            <SimpleChart />
        </div>
    );
}
export default Week5Live;