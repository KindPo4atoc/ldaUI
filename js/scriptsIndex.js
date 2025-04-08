// Анимация данных на главной странице
document.addEventListener('DOMContentLoaded', function() {
    // Генерация случайных точек данных
    const generateDataPoints = (container, count, className) => {
        for (let i = 0; i < count; i++) {
            const point = document.createElement('div');
            point.className = `data-point ${className}`;
            point.style.left = `${Math.random() * 90 + 5}%`;
            point.style.top = `${Math.random() * 90 + 5}%`;
            container.appendChild(point);
        }
    };

    // Инициализация визуализации
    const initVisualizations = () => {
        const ldaGraph = document.querySelector('.lda-graph');
        if (ldaGraph) {
            generateDataPoints(ldaGraph, 15, 'class-1');
            generateDataPoints(ldaGraph, 15, 'class-2');
            generateDataPoints(ldaGraph, 10, 'class-3');
        }
    };

    // Анимация разделяющей линии
    const animateDiscriminantLine = () => {
        const line = document.querySelector('.discriminant-line');
        if (line) {
            let angle = -15;
            let direction = 1;
            
            const animate = () => {
                angle += direction * 0.2;
                if (angle < -20 || angle > -10) direction *= -1;
                line.style.transform = `rotate(${angle}deg)`;
                requestAnimationFrame(animate);
            };
            animate();
        }
    };

    // Анимация шагов процесса
    const animateProcessSteps = () => {
        const steps = document.querySelectorAll('.process-step');
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
            }, index * 300);
        });
    };

    // Инициализация всех анимаций
    const initAnimations = () => {
        initVisualizations();
        animateDiscriminantLine();
        animateProcessSteps();
    };

    // Запуск всего
    initAnimations();
});

