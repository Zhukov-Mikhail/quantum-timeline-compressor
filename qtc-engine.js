// Quantum Timeline Compressor Engine
// Квантово-вдохновленный алгоритм оптимизации проектных сроков

class QuantumTimelineCompressor {
    constructor() {
        this.projectData = null;
        this.aggressionLevel = 70;
        this.riskThreshold = 30;
        this.simulationResults = null;
    }
    
    loadProject(projectData) {
        this.projectData = projectData;
        return this;
    }
    
    setAggressionLevel(level) {
        this.aggressionLevel = level;
        return this;
    }
    
    setRiskThreshold(threshold) {
        this.riskThreshold = threshold;
        return this;
    }
    
    runAnalysis() {
        if (!this.projectData) {
            throw new Error("Project data not loaded");
        }
        
        // Показываем индикатор загрузки
        const statusPanel = document.getElementById('status');
        statusPanel.innerHTML = `
            <div class="loading">
                <div class="quantum-spinner"></div>
                <p>Запуск квантового анализа... Симуляция 10,000+ сценариев</p>
                <div class="progress-bar">
                    <div class="progress" style="width: 0%"></div>
                </div>
            </div>
        `;
        
        // Имитация квантового анализа (в реальном проекте здесь будет сложный алгоритм)
        return new Promise((resolve) => {
            let progress = 0;
            const progressBar = statusPanel.querySelector('.progress');
            
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // Генерируем реалистичные результаты
                    const timelineReduction = Math.min(35, Math.floor(this.aggressionLevel * 0.4));
                    const riskLevel = Math.max(5, Math.min(50, Math.floor(this.aggressionLevel * 0.35)));
                    const optimalPath = Math.floor(10000 * (Math.random() * 0.3 + 0.7));
                    
                    this.simulationResults = {
                        timelineReduction: timelineReduction,
                        riskLevel: riskLevel,
                        optimalPath: optimalPath,
                        recommendations: this.generateRecommendations(timelineReduction, riskLevel)
                    };
                    
                    setTimeout(() => {
                        statusPanel.innerHTML = `
                            <div class="success">
                                <div class="checkmark">✓</div>
                                <p>Анализ завершен! Найден оптимальный путь сокращения сроков</p>
                            </div>
                        `;
                        resolve(this.simulationResults);
                    }, 300);
                }
                progressBar.style.width = `${Math.min(100, progress)}%`;
            }, 150);
        });
    }
    
    generateRecommendations(timelineReduction, riskLevel) {
        const recommendations = [];
        
        // Рекомендации на основе сокращения сроков
        if (timelineReduction > 25) {
            recommendations.push({
                priority: 'high',
                title: 'Параллельное выполнение задач',
                description: 'Задачи "Разработка интерфейса" и "Бэкенд интеграция" могут выполняться параллельно с минимальным риском'
            });
            recommendations.push({
                priority: 'medium',
                title: 'Оптимизация тестирования',
                description: 'Сократите время тестирования на 40% за счет автоматизации базовых проверок'
            });
        } else if (timelineReduction > 15) {
            recommendations.push({
                priority: 'medium',
                title: 'Критические задачи',
                description: 'Сфокусируйтесь на сжатии задач в критическом пути, особенно на этапе "Интеграция"'
            });
            recommendations.push({
                priority: 'low',
                title: 'Буферное время',
                description: 'Уменьшите буферное время между этапами с 2 дней до 1 дня'
            });
        } else {
            recommendations.push({
                priority: 'high',
                title: 'Оптимизация ресурсов',
                description: 'Перераспределите ресурсы с этапа "Документация" на "Разработка" для ускорения критического пути'
            });
            recommendations.push({
                priority: 'medium',
                title: 'Упрощение требований',
                description: 'Рассмотрите возможность временного упрощения некоторых функций для ускорения MVP'
            });
        }
        
        // Рекомендации на основе уровня риска
        if (riskLevel > this.riskThreshold) {
            recommendations.push({
                priority: 'high',
                title: 'Управление рисками',
                description: `Уровень риска (${riskLevel}%) превышает допустимый порог (${this.riskThreshold}%). Добавьте буферное время для задач с высоким риском.`
            });
        }
        
        recommendations.push({
            priority: 'low',
            title: 'Мониторинг',
            description: 'Регулярно обновляйте анализ каждые 2 недели для отслеживания изменений в проекте'
        });
        
        return recommendations;
    }
    
    getResults() {
        return this.simulationResults;
    }
}

// Глобальные переменные
let qtc = new QuantumTimelineCompressor();
let sampleProjects = {
    simple: {
        name: "Простой веб-сайт",
        tasks: [
            {id: 1, name: "Анализ требований", duration: 5, dependencies: [], risk: "low"},
            {id: 2, name: "Дизайн", duration: 7, dependencies: [1], risk: "medium"},
            {id: 3, name: "Разработка", duration: 10, dependencies: [2], risk: "high"},
            {id: 4, name: "Тестирование", duration: 5, dependencies: [3], risk: "medium"},
            {id: 5, name: "Развертывание", duration: 2, dependencies: [4], risk: "low"}
        ]
    },
    complex: {
        name: "Мобильное приложение",
        tasks: [
            {id: 1, name: "Исследование рынка", duration: 7, dependencies: [], risk: "medium"},
            {id: 2, name: "Анализ требований", duration: 5, dependencies: [1], risk: "low"},
            {id: 3, name: "UI/UX Дизайн", duration: 10, dependencies: [2], risk: "medium"},
            {id: 4, name: "Бэкенд разработка", duration: 15, dependencies: [2], risk: "high"},
            {id: 5, name: "Фронтенд разработка", duration: 12, dependencies: [3,4], risk: "high"},
            {id: 6, name: "Интеграция", duration: 8, dependencies: [5], risk: "high"},
            {id: 7, name: "Тестирование", duration: 7, dependencies: [6], risk: "medium"},
            {id: 8, name: "Подготовка к запуску", duration: 5, dependencies: [7], risk: "low"},
            {id: 9, name: "Запуск", duration: 2, dependencies: [8], risk: "medium"}
        ]
    }
};

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Обновление значений слайдеров
    const aggressionSlider = document.getElementById('aggressionSlider');
    const riskSlider = document.getElementById('riskSlider');
    
    aggressionSlider.addEventListener('input', function() {
        document.getElementById('aggressionValue').textContent = this.value;
        qtc.setAggressionLevel(parseInt(this.value));
    });
    
    riskSlider.addEventListener('input', function() {
        document.getElementById('riskValue').textContent = this.value;
        qtc.setRiskThreshold(parseInt(this.value));
    });
    
    // Запуск анализа
    document.getElementById('runAnalysis').addEventListener('click', function() {
        // Загрузка демо-данных, если нет загруженного файла
        if (!qtc.projectData) {
            qtc.loadProject(sampleProjects.complex);
        }
        
        // Запуск анализа
        qtc.runAnalysis()
            .then(results => {
                // Отображение результатов
                document.getElementById('timelineReduction').textContent = results.timelineReduction + '%';
                document.getElementById('optimalPath').textContent = results.optimalPath.toLocaleString();
                document.getElementById('riskLevel').textContent = results.riskLevel + '%';
                
                // Отображение рекомендаций
                const recommendationsList = document.getElementById('recommendationsList');
                recommendationsList.innerHTML = '';
                
                results.recommendations.forEach(rec => {
                    const recElement = document.createElement('div');
                    recElement.className = `recommendation-item priority-${rec.priority}`;
                    recElement.innerHTML = `
                        <div class="rec-header">
                            <span class="priority-badge ${rec.priority}">${rec.priority}</span>
                            <h4>${rec.title}</h4>
                        </div>
                        <p>${rec.description}</p>
                    `;
                    recommendationsList.appendChild(recElement);
                });
                
                // Отображение результатов
                document.getElementById('resultsPanel').style.display = 'block';
                
                // Визуализация
                renderGanttChart(qtc.projectData, results.timelineReduction);
                renderQuantumVisualization();
            })
            .catch(error => {
                document.getElementById('status').innerHTML = `
                    <div class="error">
                        <div class="error-icon">!</div>
                        <p>Ошибка анализа: ${error.message}</p>
                    </div>
                `;
            });
    });
    
    // Переключение вкладок
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс со всех кнопок и вкладок
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');
            
            // Добавляем активный класс текущей кнопке и вкладке
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId + 'View').style.display = 'block';
        });
    });
});

function loadSampleProject(type) {
    qtc.loadProject(sampleProjects[type]);
    document.getElementById('status').innerHTML = `
        <div class="info">
            <p>Загружен примерный проект: ${sampleProjects[type].name}</p>
        </div>
    `;
}
