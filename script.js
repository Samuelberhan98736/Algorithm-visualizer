const arrayInput = document.getElementById('array-input');
const generateArrayButton = document.getElementById('generate-array');
const algorithmSelect = document.getElementById('algorithm-select');
const startSortButton = document.getElementById('start-sort');
const visualization = document.getElementById('visualization');

let array = [];

// Generate a random array
generateArrayButton.addEventListener('click', () => {
    array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100 + 1));
    renderArray(array);
});

// Render the array in the output field
function renderArray(arr) {
    visualization.innerHTML = '';
    arr.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        visualization.appendChild(bar);
    });
}

// Bubble sort
async function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            const bars = document.querySelectorAll('.bar');
            bars[j].style.background = 'red';
            bars[j + 1].style.background = 'red';
            await sleep(100);

            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                renderArray(arr);
                await sleep(100);
            }

            // Reset the color
            bars[j].style.background = '#4CAF50';
            bars[j + 1].style.background = '#4CAF50';
        }
    }
}

// Selection sort
async function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        let bars = document.querySelectorAll('.bar');
        bars[minIndex].style.background = 'red';
        await sleep(100);

        for (let j = i + 1; j < arr.length; j++) {
            bars[j].style.background = 'red';
            await sleep(100);

            if (arr[j] < arr[minIndex]) {
                bars[minIndex].style.background = '#4CAF50';
                minIndex = j;
                bars[minIndex].style.background = 'red';
                await sleep(100);
            } else {
                bars[j].style.background = '#4CAF50';
            }
        }

        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            renderArray(arr);
            await sleep(100);
        }

        bars = document.querySelectorAll('.bar');
        bars[i].style.background = '#4CAF50';
    }
}

// Insertion sort
async function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        let bars = document.querySelectorAll('.bar');
        bars[i].style.background = 'red';
        await sleep(100);

        while (j >= 0 && arr[j] > key) {
            bars[j].style.background = 'red';
            await sleep(100);

            arr[j + 1] = arr[j];
            renderArray(arr);
            bars = document.querySelectorAll('.bar');
            bars[j + 1].style.background = '#4CAF50';
            j--;

            if (j >= 0) {
                bars[j].style.background = 'red';
                await sleep(100);
            }
        }

        arr[j + 1] = key;
        renderArray(arr);
        bars = document.querySelectorAll('.bar');
        bars[j + 1].style.background = '#4CAF50';
        await sleep(100);
    }
}

// Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Start sorting
startSortButton.addEventListener('click', async () => {
    const algorithm = algorithmSelect.value;
    if (algorithm === 'bubble') {
        await bubbleSort(array);
    } else if (algorithm === 'selection') {
        await selectionSort(array);
    } else if (algorithm === 'insertion') {
        await insertionSort(array);
    }
});