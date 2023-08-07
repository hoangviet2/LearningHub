import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {Chart as Chartjs} from "chart.js/auto";
const Chartt = ({plot_data}) => {
    return(
        <Pie data={plot_data} />
    )
}

export default Chartt;