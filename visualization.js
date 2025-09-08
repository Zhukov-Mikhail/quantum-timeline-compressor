// Визуализация результатов Quantum Timeline Compressor

function renderGanttChart(project, reductionPercentage) {
    const chartContainer = document.getElementById('ganttChart');
    chartContainer.innerHTML = '';
    
    // Параметры визуализации
    const totalDuration = project.tasks.reduce((sum, task) => {
        // Вычисляем конечную дату для каждой задачи
        let endDate = task.duration;
        task.dependencies.forEach(depId => {
            const depTask = project.tasks.find(t => t.id === depId);
            if (depTask) endDate = Math.max(endDate, depTask.end || depTask.duration + (depTask.start || 0));
        });
        task.start = task.dependencies.length > 0 ? 
            Math.max(...task.dependencies.map(depId => {
                const depTask = project.tasks.find(t => t.id === depId);
                return depTask ? (depTask.end || depTask.duration) : 0;
            })) : 0;
        task.end = task.start + task.duration;
        return sum;
    }, 0);
    
    const chartWidth = chartContainer.clientWidth;
    const taskHeight = 40;
    const margin = {top: 20, right: 20, bottom: 30, left: 150};
    const width = chartWidth - margin.left - margin.right;
    const height = (project.tasks.length * (taskHeight + 10)) + margin.top + margin.bottom;
    
    // Создаем SVG
    const svg = d3.select("#ganttChart")
        .append("svg")
        .attr("width", chartWidth)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Шкала времени
    const x = d3.scaleLinear()
        .domain([0, totalDuration])
        .range([0, width]);
    
    // Ось X
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(totalDuration));
    
    // Задачи
    const taskItems = svg.selectAll(".task")
        .data(project.tasks)
        .enter()
        .append("g")
        .attr("class", "task");
    
    // Фон задачи
    taskItems.append("rect")
        .attr("class", d => `task-rect task-risk-${d.risk}`)
        .attr("x", d => x(d.start))
        .attr("y", (d, i) => i * (taskHeight + 10))
        .attr("width", d => x(d.duration))
        .attr("height", taskHeight - 5)
        .attr("rx", 5);
    
    // Название задачи
    taskItems.append("text")
        .attr("x", 5)
        .attr("y", (d, i) => i * (taskHeight + 10) + taskHeight / 2 + 4)
        .attr("text-anchor", "start")
        .text(d => d.name)
        .attr("font-size", "14px")
        .attr("fill", "#333");
    
    // Продолжительность
    taskItems.append("text")
        .attr("x", d => x(d.start) + x(d.duration) + 10)
        .attr("y", (d, i) => i * (taskHeight + 10) + taskHeight / 2 + 4)
        .attr("text-anchor", "start")
        .text(d => `${d.duration} дн`)
        .attr("font-size", "12px")
        .attr("fill", "#666");
    
    // Заголовки
    svg.append("text")
        .attr("x", -margin.left/2)
        .attr("y", -margin.top/2)
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Задачи");
    
    svg.append("text")
        .attr("x", width/2)
        .attr("y", height - margin.bottom/2)
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Дни");
    
    // Легенда рисков
    const legend = svg.append("g")
        .attr("transform", `translate(${width - 180}, 10)`);
    
    const riskLevels = ["low", "medium", "high"];
    riskLevels.forEach((level, i) => {
        legend.append("rect")
            .attr("x", 0)
            .attr("y", i * 20)
            .attr("width", 15)
            .attr("height", 15)
            .attr("class", `task-risk-${level}`);
        
        legend.append("text")
            .attr("x", 20)
            .attr("y", i * 20 + 12)
            .text(level.charAt(0).toUpperCase() + level.slice(1))
            .attr("font-size", "12px");
    });
    
    // Эффект сжатия
    if (reductionPercentage > 0) {
        const originalDuration = totalDuration;
        const compressedDuration = totalDuration * (1 - reductionPercentage/100);
        
        // Линия оригинального срока
        svg.append("line")
            .attr("x1", x(originalDuration))
            .attr("y1", 0)
            .attr("x2", x(originalDuration))
            .attr("y2", height - margin.bottom)
            .attr("stroke", "#999")
            .attr("stroke-dasharray", "5,5");
        
        svg.append("text")
            .attr("x", x(originalDuration) + 5)
            .attr("y", 20)
            .text(`Оригинальный срок: ${originalDuration} дн`)
            .attr("font-size", "12px")
            .attr("fill", "#999");
        
        // Линия сжатого срока
        svg.append("line")
            .attr("x1", x(compressedDuration))
            .attr("y1", 0)
            .attr("x2", x(compressedDuration))
            .attr("y2", height - margin.bottom)
            .attr("stroke", "#4a154b")
            .attr("stroke-width", 2);
        
        svg.append("text")
            .attr("x", x(compressedDuration) + 5)
            .attr("y", 40)
            .text(`Сжатый срок: ${Math.round(compressedDuration)} дн`)
            .attr("font-weight", "bold")
            .attr("fill", "#4a154b");
    }
}

function renderQuantumVisualization() {
    const container = document.getElementById('quantumVisualization');
    container.innerHTML = '';
    
    const width = container.clientWidth;
    const height = 400;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    // Создаем SVG
    const svg = d3.select("#quantumVisualization")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${centerX},${centerY})`);
    
    // Квантовые орбиты
    const orbits = [0.3, 0.6, 0.9];
    orbits.forEach((scale, i) => {
        svg.append("circle")
            .attr("r", radius * scale)
            .attr("fill", "none")
            .attr("stroke", i === 1 ? "#4a154b" : "#aaa")
            .attr("stroke-width", i === 1 ? 2 : 1)
            .attr("opacity", 0.7);
    });
    
    // Квантовые состояния (задачи)
    const tasks = [
        {name: "Анализ", angle: 0, radius: radius * 0.3, risk: "low"},
        {name: "Дизайн", angle: 45, radius: radius * 0.6, risk: "medium"},
        {name: "Разработка", angle: 90, radius: radius * 0.9, risk: "high"},
        {name: "Тестирование", angle: 135, radius: radius * 0.6, risk: "medium"},
        {name: "Развертывание", angle: 180, radius: radius * 0.3, risk: "low"},
        {name: "Оптимизация", angle: 225, radius: radius * 0.6, risk: "medium"},
        {name: "Документация", angle: 270, radius: radius * 0.9, risk: "high"},
        {name: "Поддержка", angle: 315, radius: radius * 0.6, risk: "medium"}
    ];
    
    // Квантовые связи (оптимальные пути)
    const connections = [
        {source: 0, target: 1, probability: 0.9},
        {source: 1, target: 2, probability: 0.85},
        {source: 2, target: 3, probability: 0.75},
        {source: 3, target: 4, probability: 0.95},
        {source: 0, target: 5, probability: 0.6},
        {source: 5, target: 6, probability: 0.7},
        {source: 6, target: 7, probability: 0.8},
        {source: 2, target: 5, probability: 0.4},
        {source: 3, target: 6, probability: 0.35}
    ];
    
    // Рисуем связи
    connections.forEach(connection => {
        const source = tasks[connection.source];
        const target = tasks[connection.target];
        
        const sourceX = Math.cos(source.angle * Math.PI / 180) * source.radius;
        const sourceY = Math.sin(source.angle * Math.PI / 180) * source.radius;
        const targetX = Math.cos(target.angle * Math.PI / 180) * target.radius;
        const targetY = Math.sin(target.angle * Math.PI / 180) * target.radius;
        
        svg.append("line")
            .attr("x1", sourceX)
            .attr("y1", sourceY)
            .attr("x2", targetX)
            .attr("y2", targetY)
            .attr("stroke", "#4a154b")
            .attr("stroke-width", connection.probability * 3)
            .attr("opacity", connection.probability * 0.7);
    });
    
    // Рисуем квантовые состояния (задачи)
    tasks.forEach(task => {
        const x = Math.cos(task.angle * Math.PI / 180) * task.radius;
        const y = Math.sin(task.angle * Math.PI / 180) * task.radius;
        
        // Основной кружок
        svg.append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 15)
            .attr("fill", getRiskColor(task.risk))
            .attr("opacity", 0.8);
        
        // Эффект квантового облака
        svg.append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 25)
            .attr("fill", "none")
            .attr("stroke", getRiskColor(task.risk))
            .attr("stroke-width", 1)
            .attr("opacity", 0.3)
            .attr("stroke-dasharray", "5,3");
        
        // Название задачи
        svg.append("text")
            .attr("x", x + (task.angle > 90 && task.angle < 270 ? -25 : 25))
            .attr("y", y + 5)
            .attr("text-anchor", task.angle > 90 && task.angle < 270 ? "end" : "start")
            .text(task.name)
            .attr("font-size", "12px")
            .attr("fill", "#333");
    });
    
    // Центральный квантовый эффект
    svg.append("circle")
        .attr("r", 10)
        .attr("fill", "#4a154b")
        .attr("opacity", 0.9);
    
    // Анимация квантовых частиц
    for (let i = 0; i < 20; i++) {
        const particleRadius = Math.random() * 3 + 1;
        const particleAngle = Math.random() * 360;
        const particleDistance = radius * (0.2 + Math.random() * 0.7);
        
        svg.append("circle")
            .attr("cx", Math.cos(particleAngle * Math.PI / 180) * particleDistance)
            .attr("cy", Math.sin(particleAngle * Math.PI / 180) * particleDistance)
            .attr("r", particleRadius)
            .attr("fill", "#6a0dad")
            .attr("opacity", Math.random() * 0.5 + 0.2)
            .transition()
            .duration(5000 + Math.random() * 5000)
            .attrTween("transform", function() {
                return function(t) {
                    const newAngle = (particleAngle + t * 360 * (Math.random() > 0.5 ? 1 : -1)) % 360;
                    const newDistance = particleDistance * (0.9 + Math.random() * 0.2);
                    return `translate(${Math.cos(newAngle * Math.PI / 180) * newDistance}, 
                                    ${Math.sin(newAngle * Math.PI / 180) * newDistance})`;
                };
            })
            .on("end", function repeat() {
                d3.active(this)
                    .transition()
                    .duration(5000 + Math.random() * 5000)
                    .attrTween("transform", function() {
                        return function(t) {
                            const newAngle = (particleAngle + t * 360 * (Math.random() > 0.5 ? 1 : -1)) % 360;
                            const newDistance = particleDistance * (0.9 + Math.random() * 0.2);
                            return `translate(${Math.cos(newAngle * Math.PI / 180) * newDistance}, 
                                            ${Math.sin(newAngle * Math.PI / 180) * newDistance})`;
                        };
                    })
                    .on("end", repeat);
            });
    }
    
    // Легенда
    const legend = svg.append("g")
        .attr("transform", `translate(${-width/2 + 20}, ${-height/2 + 20})`);
    
    legend.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .text("Квантовая визуализация проекта")
        .attr("font-weight", "bold")
        .attr("font-size", "14px");
    
    legend.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .text("Толщина линий показывает вероятность оптимального пути")
        .attr("font-size", "12px")
        .attr("fill", "#666");
}

function getRiskColor(riskLevel) {
    switch (riskLevel) {
        case 'low': return '#4caf50';
        case 'medium': return '#ff9800';
        case 'high': return '#f44336';
        default: return '#aaa';
    }
}
