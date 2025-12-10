// Canvas setup
const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// State
let isDrawing = false;
let tool = 'pen';
let color = '#000000';
let lineWidth = 3;
let history = [];
let historyStep = -1;

// Save initial state
function saveToHistory() {
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(canvas.toDataURL());
    history = newHistory;
    historyStep = newHistory.length - 1;
    updateUndoRedoButtons();
}
saveToHistory();

// Tool buttons
document.getElementById('penBtn').addEventListener('click', () => {
    tool = 'pen';
    updateToolButtons();
});

document.getElementById('eraserBtn').addEventListener('click', () => {
    tool = 'eraser';
    updateToolButtons();
});

document.getElementById('textBtn').addEventListener('click', () => {
    tool = 'text';
    updateToolButtons();
});

function updateToolButtons() {
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (tool === 'pen') document.getElementById('penBtn').classList.add('active');
    if (tool === 'eraser') document.getElementById('eraserBtn').classList.add('active');
    if (tool === 'text') document.getElementById('textBtn').classList.add('active');
}

// Color buttons
document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        color = btn.dataset.color;
        document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Brush size
const brushSize = document.getElementById('brushSize');
const sizeDisplay = document.getElementById('sizeDisplay');

brushSize.addEventListener('input', () => {
    lineWidth = parseInt(brushSize.value);
    sizeDisplay.textContent = `${lineWidth}px`;
});

// Drawing functions
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

function startDrawing(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'text') {
        const text = prompt('Enter text:');
        if (text) {
            ctx.font = `${lineWidth * 8}px Arial`;
            ctx.fillStyle = color;
            ctx.fillText(text, x, y);
            saveToHistory();
        }
        return;
    }

    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function draw(e) {
    if (!isDrawing || tool === 'text') return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = color;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
}

function stopDrawing() {
    if (isDrawing) {
        saveToHistory();
    }
    isDrawing = false;
}

// Undo/Redo
document.getElementById('undoBtn').addEventListener('click', undo);
document.getElementById('redoBtn').addEventListener('click', redo);

function undo() {
    if (historyStep > 0) {
        historyStep--;
        const img = new Image();
        img.src = history[historyStep];
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        updateUndoRedoButtons();
    }
}

function redo() {
    if (historyStep < history.length - 1) {
        historyStep++;
        const img = new Image();
        img.src = history[historyStep];
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        updateUndoRedoButtons();
    }
}

function updateUndoRedoButtons() {
    document.getElementById('undoBtn').disabled = historyStep <= 0;
    document.getElementById('redoBtn').disabled = historyStep >= history.length - 1;
}

// Clear canvas
document.getElementById('clearBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the canvas?')) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveToHistory();
    }
});

// Download
document.getElementById('downloadBtn').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvas.toDataURL();
    link.click();
});

// Upload
document.getElementById('uploadBtn').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
                saveToHistory();
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Initial button states
updateUndoRedoButtons();