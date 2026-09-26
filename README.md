# Whiteboard

A simple browser-based whiteboard app built with HTML, CSS, and JavaScript. It lets you draw, erase, add text, change colors, adjust brush size, and download your work as an image.

## Features

- Freehand drawing with a pen tool
- Eraser tool for removing strokes
- Text tool for adding labels or notes
- Color palette for switching brush colors
- Adjustable brush size
- Undo and redo support
- Clear canvas action
- Download canvas as a PNG image
- Upload an existing image to the canvas
- Touch-friendly support for mobile devices

## Demo

Open `index.html` in a browser to use the app locally.

## Running the project

### Option 1: Open directly

1. Download or clone the repository.
2. Open `index.html` in your browser.

### Option 2: Run a local web server

```bash
git clone https://github.com/moonxplor/whiteboard.git
cd whiteboard
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Project structure

```text
whiteboard/
├── index.html
├── style.css
├── script.js
└── README.md
```

- `index.html` — page structure and toolbar UI
- `style.css` — layout and styling
- `script.js` — canvas logic, drawing tools, history, export/import

## How it works

The app uses the HTML5 Canvas API to render drawings in real time. The toolbar updates the active tool and color, while the drawing logic records strokes and supports undo/redo operations through canvas snapshots.

## Customization

You can tweak the app by editing:

- `style.css` to change the theme or layout
- `script.js` to add new tools or modify behavior
- `index.html` to add or remove toolbar controls

## Notes

This project is a lightweight front-end whiteboard and is ideal for quick sketching or annotation tasks. It does not include real-time multi-user collaboration or cloud syncing.

## Contributing

Contributions are welcome. If you want to improve the app, feel free to fork the repository and submit a pull request.
